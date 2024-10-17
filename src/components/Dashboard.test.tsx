import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { fetchSocialMediaData } from '../api/socialMedia';

jest.mock('../api/socialMedia');

const mockSocialMediaData = {
  instagram: [
    { id: 1, engagement: 100 },
    { id: 2, engagement: 200 },
  ],
  twitter: [
    { id: 3, engagement: 150 },
    { id: 4, engagement: 250 },
  ],
};

beforeEach(() => {
  fetchSocialMediaData.mockImplementation((platform) => Promise.resolve(mockSocialMediaData[platform]));
});

test('renders dashboard with correct data', async () => {
  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText('Welcome to OmniCreator')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument(); // Total posts
    expect(screen.getByText('700')).toBeInTheDocument(); // Total engagement
    expect(screen.getByText('175')).toBeInTheDocument(); // Average engagement
  });
});

test('displays loading spinner while fetching data', () => {
  render(<Dashboard />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

test('displays error message on API failure', async () => {
  fetchSocialMediaData.mockRejectedValue(new Error('API Error'));
  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText('Failed to fetch dashboard data')).toBeInTheDocument();
  });
});