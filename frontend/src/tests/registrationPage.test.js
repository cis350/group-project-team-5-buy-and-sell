// __tests__/RegistrationPage.test.jsx
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import RegistrationPage from '../pages/RegistrationPage';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('RegistrationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock localStorage.setItem
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });
  });

  test('renders RegistrationPage and handles user input', () => {
    render(
      <SnackbarProvider>
        <Router>
          <RegistrationPage />
        </Router>
      </SnackbarProvider>,
    );

    // Check for the text and buttons
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('By selecting Create personal account, you agree to our')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();

    // Check for input fields
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('School Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(usernameInput.value).toBe('johndoe');
    expect(emailInput.value).toBe('johndoe@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('handles successful registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        message: 'Successfully Registered!',
      },
    });

    render(
      <SnackbarProvider>
        <Router>
          <RegistrationPage />
        </Router>
      </SnackbarProvider>,
    );

    // Enter registration details
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('School Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Click the Create personal account button
    fireEvent.click(screen.getByText('Create personal account'));

    // Wait for the registration to be processed
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          email: 'johndoe@example.com',
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password123',
        },
        { withCredentials: true },
      );
    });

    // Check if the success message is displayed
    await waitFor(() => {
      expect(screen.getByText('Successfully Registered!')).toBeInTheDocument();
    });
  });

  test('handles registration failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <SnackbarProvider>
        <Router>
          <RegistrationPage />
        </Router>
      </SnackbarProvider>,
    );

    // Enter registration details
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('School Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Click the Create personal account button
    fireEvent.click(screen.getByText('Create personal account'));

    // Wait for the registration to be processed
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          email: 'johndoe@example.com',
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password123',
        },
        { withCredentials: true },
      );
    });

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Registration Failed. Please check all the required fields.')).toBeInTheDocument();
      expect(screen.getByText('You entered invalid information')).toBeInTheDocument();
    });
  });
});
