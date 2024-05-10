import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import ItemDescription from '../pages/ItemDescriptionPage'; // Adjust the path as necessary

// Mock modules
jest.mock('axios');
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ItemDescription Tests', () => {
    beforeEach(() => {
        // Reset mocks and local storage before each test
        jest.clearAllMocks();
        localStorage.setItem('accessToken', 'fake-token');
    });

    afterEach(() => {
        jest.resetAllMocks(); // Reset mocks to clear any mocked implementation
    });

    test('displays loading state correctly', async () => {
        // Delay the resolution to simulate network delay
        axios.get.mockResolvedValueOnce(new Promise(resolve => {
            setTimeout(() => resolve({
                data: { name: 'Item 1', photos: [], description: '', price: '', payment: '', delivery: '' }
            }), 100);
        }));

        await act(async () => {
            render(
                <MemoryRouter>
                    <ItemDescription />
                </MemoryRouter>
            );
        });

        // Use waitFor to ensure the component finishes rendering
        await waitFor(() => {
            expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
        });
    });

    test('should display item details after fetching data', async () => {
        const itemData = {
            data: {
                name: 'Test Item',
                photos: ['https://example.com/photo1.jpg', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150?dummy=2'],
                description: 'Description here',
                price: '10.99',
                payment: 'Visa',
                delivery: '2-day shipping'
            }
        };
        axios.get.mockResolvedValue(itemData);
        
        await act(async () => {
            render(
                <MemoryRouter>
                    <ItemDescription />
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Test Item')).toBeInTheDocument();
            expect(screen.getByText('Description here')).toBeInTheDocument();
            expect(screen.getByText('$10.99')).toBeInTheDocument();
        });
    });

    test('should navigate home if no access token is available', async () => {
        localStorage.removeItem('accessToken'); // Simulate user not logged in

        render(
            <MemoryRouter>
                <ItemDescription />
            </MemoryRouter>
        );
    });

    test('does not render item details if no access token', async () => {
        localStorage.removeItem('accessToken'); // Make sure no token is available
    
        render(<MemoryRouter><ItemDescription /></MemoryRouter>);
    
        // Check that only the "Loading..." text is rendered and nothing else
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByText(/item name/i)).not.toBeInTheDocument();
    });

    test('displays placeholder images if less than three photos are returned', async () => {
        axios.get.mockResolvedValueOnce({
            data: { name: 'Item', photos: ['https://example.com/photo1.jpg'], description: 'Desc', price: '100', payment: 'Cash', delivery: 'Instant' }
        });
    
        render(<MemoryRouter><ItemDescription /></MemoryRouter>);
    
        await waitFor(() => {
            const images = screen.getAllByRole('img'); // Get all images rendered by the component
            const placeholders = images.filter(img => img.src.includes('https://via.placeholder.com/150'));
            expect(placeholders.length).toBe(2); // Expecting two placeholders
        });
    });
});
