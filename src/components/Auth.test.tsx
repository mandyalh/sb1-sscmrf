import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Auth from './Auth';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('renders login form', () => {
  renderWithRouter(
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
  
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('switches to signup form', () => {
  renderWithRouter(
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
  
  fireEvent.click(screen.getByText(/sign up/i));
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

test('submits form with user input', () => {
  const mockLogin = jest.fn();
  jest.mock('../context/AuthContext', () => ({
    useAuth: () => ({
      login: mockLogin,
      isLoading: false,
      error: null,
    }),
  }));

  renderWithRouter(
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
  
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
});