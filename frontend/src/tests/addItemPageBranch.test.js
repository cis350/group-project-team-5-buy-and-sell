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
});
