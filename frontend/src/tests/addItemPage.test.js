import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AddItemPage from '../pages/AddItemPage';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

// Mocking axios and fileUpload function
jest.mock('axios');
import onFileUpload from '../utils/fileUpload'; // Mocked for tests
jest.mock('../utils/fileUpload'); // Assuming fileUpload is the function you want to mock

const CustomSnackbar = React.forwardRef((props, ref) => {
    // Your custom snackbar content and logic
    return (
      <div ref={ref}>{/* ... */}</div>
    );
  });

// Setup mock navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const TestWrapper = () => {
    return (
      <BrowserRouter>
        <SnackbarProvider>
            <AddItemPage />
        </SnackbarProvider>    
      </BrowserRouter>
    );
  };
  
  describe('AddItemPage', () => {

  test('renders both components', () => {
    render(<TestWrapper />);
  });

  test('initial render and component structure', () => {
    render(<TestWrapper />);
    const pennMartTexts = screen.getAllByText('PennMart');
    expect(pennMartTexts[0]).toBeInTheDocument();  // This now should work without error
    expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item Price')).toBeInTheDocument();
    expect(screen.getByText('Complete Listing')).toBeInTheDocument();
  });

  test('allows input for all form fields', async () => {
    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText('Item Name'), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByPlaceholderText('Item Description'), { target: { value: 'Description' } });
    fireEvent.change(screen.getByPlaceholderText('Item Price'), { target: { value: '100' } });
  
    expect(screen.getByPlaceholderText('Item Name').value).toBe('Test Item');
    expect(screen.getByPlaceholderText('Item Description').value).toBe('Description');
    expect(screen.getByPlaceholderText('Item Price').value).toBe('100');
  });

  test('handles file upload', async () => {
    render(<TestWrapper />);
    const fileInput = screen.getByLabelText('+'); // Gets the input associated with the '+' label
    const file = new File(['(binary)'], 'photo.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      // Replace this with the actual expected result after file upload
      // For example, checking if the image preview is displayed
      const imagePreview = screen.getByAltText(`Upload 0`);
      expect(imagePreview).toBeInTheDocument();
    });
  });

  test('submitting the form with incomplete data shows error notifications', async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText('Complete Listing'));
  
    await waitFor(() => {
      expect(screen.queryByText('Please fill in all required fields and upload at least one photo.')).toBeInTheDocument();
    });
  });
  
  test('snapshot of AddItemPage', () => {
    const component = renderer.create(<TestWrapper />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});