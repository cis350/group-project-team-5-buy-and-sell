import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';
import AddItemPage from '../pages/AddItemPage';

// Mock utilities and libraries
jest.mock('axios');
jest.mock('../utils/fileUpload', () => ({
  __esModule: true,
  default: jest.fn(file => Promise.resolve(`http://dummyimage.com/${file.target.files[0].name}`)),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const AllProviders = ({ children }) => (
  <BrowserRouter>
    <SnackbarProvider>
      {children}
    </SnackbarProvider>
  </BrowserRouter>
);

const setup = () => render(<AddItemPage />, { wrapper: AllProviders });

describe('AddItemPage', () => {
  beforeEach(() => {
    axios.post.mockClear();
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    const { getByText } = setup();
    expect(getByText('Create a listing')).toBeInTheDocument();
  });

  it('allows input for all form fields and submits a correct form', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Item Name'), { target: { value: 'New Chair' } });
    fireEvent.change(screen.getByPlaceholderText('Item Description'), { target: { value: 'Comfortable armchair' } });
    fireEvent.change(screen.getByPlaceholderText('Item Price'), { target: { value: '250' } });
    fireEvent.change(screen.getByText('Category'), { target: { value: 'furniture' } });
    fireEvent.change(screen.getByText('Preferred Payment Method'), { target: { value: 'cash' } });
    fireEvent.change(screen.getByText('Delivery Method'), { target: { value: 'meetup' } });

    // Simulate file upload
    const file = new File(['(⌐□_□)'], 'chill.png', { type: 'image/png' });
    const fileInput = screen.getByText('+').querySelector('input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => screen.getByAltText('Upload 0'));

    fireEvent.click(screen.getByText('Complete Listing'));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(screen.queryByText('Please fill in all required fields and upload at least one photo.')).toBeNull();
  });

  it('displays an error when trying to submit an empty form', async () => {
    setup();

    fireEvent.click(screen.getByText('Complete Listing'));

    await waitFor(() => screen.getByText('Please fill in all required fields and upload at least one photo.'));
  });

  it('handles photo upload errors gracefully', async () => {
    jest.mock('../utils/fileUpload', () => ({
      __esModule: true,
      default: jest.fn(() => Promise.reject(new Error('Upload failed'))),
    }));

    setup();
    const file = new File(['(⌐□_□)'], 'broken.png', { type: 'image/png' });
    const fileInput = screen.getByText('+').querySelector('input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText('Error uploading one or more files:')).toBeInTheDocument());
  });

  it('tests navigation when user is not logged in', () => {
    localStorage.removeItem('accessToken'); // Ensure no token is available
    setup();
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(screen.getByText('Please log in first.')).toBeInTheDocument();
  });

});
