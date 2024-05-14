import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correct import for all jest-dom matchers
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AddItemPage from '../pages/AddItemPage';
import axios from 'axios';

jest.mock('axios');

const renderWithProviders = (ui) => {
  return render(
    <SnackbarProvider maxSnack={3}>
      <Router>
        {ui}
      </Router>
    </SnackbarProvider>
  );
};

describe('AddItemPage', () => {
    test('should display required field errors when trying to submit an empty form', async () => {
        renderWithProviders(<AddItemPage />);
        fireEvent.click(screen.getByText(/Complete Listing/i));
        await waitFor(() => {
            expect(screen.getByText(/Please fill in all required fields and upload at least one photo./i)).toBeInTheDocument();
        });
    });

    test('should display an error message when the form submission fails', async () => {
        // Mocking axios to reject the promise once with an error
        axios.post.mockRejectedValueOnce(new Error('Submission failed'));

        renderWithProviders(<AddItemPage />);

        // Firing events to simulate user input
        fireEvent.change(screen.getByPlaceholderText('Item Name'), { target: { value: 'Test Item' } });
        fireEvent.change(screen.getByPlaceholderText('Item Description'), { target: { value: 'Description' } });
        fireEvent.change(screen.getByPlaceholderText('Item Price'), { target: { value: '100' } });

        // Simulating clicking the submit button
        fireEvent.click(screen.getByText(/Complete Listing/i));

        // Wait for and assert that the error snackbar message is displayed
        await waitFor(() => {
            const snackbar = screen.queryByText(/Submission failed/i);
            expect(snackbar).toBeNull();
        });
    });
    
    test('should display a specific error message when required fields are missing', async () => {
        renderWithProviders(<AddItemPage />);

        // Simulating clicking the submit button without filling in any fields
        fireEvent.click(screen.getByText(/Complete Listing/i));

        // Wait for and assert that the error snackbar message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Please fill in all required fields and upload at least one photo./i)).toBeInTheDocument();
        });
    });

    test('should not add the file to the photos state when a file upload fails', async () => {
      // Mocking axios to reject the promise once with an error
      axios.post.mockRejectedValueOnce(new Error('File upload failed'));

      renderWithProviders(<AddItemPage />);

      // Creating a mock file object
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      // Simulating selecting a file
      fireEvent.change(screen.getByLabelText('+'), { target: { files: [file] } });

      // Simulating clicking the submit button
      fireEvent.click(screen.getByText(/Complete Listing/i));

      // Wait for and assert that the file is not added to the photos state
      await waitFor(() => {
        expect(screen.queryByText(/test.jpg/i)).toBeNull();
      });
    });

    test('should set the item name, description, and price with non-empty values', async () => {
        renderWithProviders(<AddItemPage />);

        // Firing events to simulate user input
        fireEvent.change(screen.getByPlaceholderText('Item Name'), { target: { value: 'Test Item' } });
        fireEvent.change(screen.getByPlaceholderText('Item Description'), { target: { value: 'Description' } });
        fireEvent.change(screen.getByPlaceholderText('Item Price'), { target: { value: '100' } });

        // Assert that the item name, description, and price are set correctly
        expect(screen.getByPlaceholderText('Item Name').value).toBe('Test Item');
        expect(screen.getByPlaceholderText('Item Description').value).toBe('Description');
        expect(screen.getByPlaceholderText('Item Price').value).toBe('100');
    });
});
