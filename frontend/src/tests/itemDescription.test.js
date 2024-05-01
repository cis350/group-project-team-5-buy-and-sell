import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemDescription from '../pages/ItemDescriptionPage';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import '@testing-library/jest-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('ItemDescription', () => {
    beforeEach(() => {
        localStorage.setItem('accessToken', 'fake-token');
        axios.get.mockClear();
        mockNavigate.mockClear();
        useParams.mockReturnValue({ itemId: '123' });
        useNavigate.mockReturnValue(mockNavigate);
    });

    it('fetches item data successfully and displays it', async () => {
        const itemData = {
            data: {
                name: 'Vintage Camera',
                photos: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
                description: 'A classic camera for photography enthusiasts.',
                price: '150',
                category: 'Electronics',
                payment: 'Cash',
                delivery: 'Meetup',
            },
        };
        axios.get.mockResolvedValue(itemData);

        render(
            <BrowserRouter>
                <ItemDescription />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(screen.getByText('Vintage Camera')).toBeInTheDocument();
            expect(screen.getByText('Electronics')).toBeInTheDocument();
            expect(screen.getByText('A classic camera for photography enthusiasts.')).toBeInTheDocument();
            expect(screen.getByText('$150')).toBeInTheDocument();
        });
    });

    it('navigates to home if no token is present', async () => {
        localStorage.removeItem('accessToken');
        render(
            <BrowserRouter>
                <ItemDescription />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('handles API errors gracefully', async () => {
        axios.get.mockRejectedValue(new Error('Failed to fetch data'));
        render(
            <BrowserRouter>
                <ItemDescription />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Error loading the item, please try again later.')).toBeInTheDocument(); // Assuming there is a text for error handling
        });
    });
});
