import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WeeklyWeatherComponent from '../../Components/WeeklyWeatherComponent';
import { fetchWeeklyWeatherData, getCurrentLocation } from '../../Components/WeatherService';
import { jest } from '@jest/globals';
// Mocking the WeatherService functions
jest.mock('./WeatherService', () => ({
  fetchWeeklyWeatherData: jest.fn(),
  getCurrentLocation: jest.fn(),
}));

describe('WeeklyWeatherComponent', () => {
  const mockForecastData = {
    daily: [
      { dt: 1634160000, temp: { day: 18 }, weather: [{ icon: '10d' }] },
      { dt: 1634246400, temp: { day: 20 }, weather: [{ icon: '04d' }] },
      // add more mock data as needed
    ],
  };

  beforeEach(() => {
    (getCurrentLocation as jest.Mock).mockResolvedValue({ latitude: 37.7749, longitude: -122.4194 });
    (fetchWeeklyWeatherData as jest.Mock).mockResolvedValue(mockForecastData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator initially', () => {
    const { getByTestId } = render(<WeeklyWeatherComponent />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('renders weekly forecast data after loading', async () => {
    const { getByText, queryByTestId } = render(<WeeklyWeatherComponent />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull(); // Loading indicator should be gone
    });

    // Check if forecast data is rendered
    expect(getByText('Monday')).toBeTruthy();
    expect(getByText('18°C')).toBeTruthy();
    expect(getByText('Tuesday')).toBeTruthy();
    expect(getByText('20°C')).toBeTruthy();
  });

  test('handles API errors gracefully', async () => {
    (fetchWeeklyWeatherData as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { queryByTestId, queryByText } = render(<WeeklyWeatherComponent />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(queryByText('Failed to load weather data')).toBeTruthy();
  });
});
