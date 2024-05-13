// __tests__/ProfilePage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ProfilePage from '../pages/ProfilePage';

jest.mock('axios');

describe('ProfilePage', () => {
  beforeEach(() => {
    // Mock localStorage
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'accessToken') {
        return 'testAccessToken';
      }
      return null;
    });

    // Mock user data response
    axios.get.mockImplementation((url) => {
      if (url === `${import.meta.env.VITE_API_URL}/userinfo`) {
        return Promise.resolve({
          data: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
          },
        });
      }
      if (url === `${import.meta.env.VITE_API_URL}/items/1/items`) {
        return Promise.resolve({
          data: [
            {
              id: '1',
              name: 'Test Item 1',
              photos: ['https://via.placeholder.com/150'],
              price: 10,
            },
            {
              id: '2',
              name: 'Test Item 2',
              photos: ['https://via.placeholder.com/150'],
              price: 20,
            },
          ],
        });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to home if no access token', async () => {
    // Clear mock localStorage
    Storage.prototype.getItem.mockImplementation(() => null);

    render(
      <SnackbarProvider>
        <Router>
          <ProfilePage />
        </Router>
      </SnackbarProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Please log in first.')).toBeInTheDocument();
    });
  });

  test('fetches user data and item listings if access token exists', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <ProfilePage />
        </Router>
      </SnackbarProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Test Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Item 2')).toBeInTheDocument();
    });
  });

  test('renders ProfilePage and fetches user data and items', async () => {
    render(
      <SnackbarProvider>
        <Router>
          <ProfilePage />
        </Router>
      </SnackbarProvider>
    );

    // Check for navigation and header elements
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About Us' })).toBeInTheDocument();

    // Check for user profile details
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('University of Pennsylvania')).toBeInTheDocument();
      expect(screen.getByText('23 Followers')).toBeInTheDocument();
      expect(screen.getByText('43 Reviews')).toBeInTheDocument();
      expect(screen.getByText('7/100')).toBeInTheDocument();
    });

    // Check for item listings
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
      expect(screen.getByText('Test Item 2')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('$20')).toBeInTheDocument();
    });

    // Check for placeholder items
    expect(screen.getAllByRole('img')).toHaveLength(7); // Including placeholders
  });
});
