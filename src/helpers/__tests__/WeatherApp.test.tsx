import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WeatherApp from '../../Components/WeatherApp';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { request, RESULTS } from 'react-native-permissions';
import { jest } from '@jest/globals';
// Mock dependencies
jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  request: jest.fn(),
  PERMISSIONS: {
    ANDROID: { ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION' },
    IOS: { LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE' },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
}));

const mockAxios = new MockAdapter(axios);

describe('WeatherApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when location permission is granted and weather data is fetched', async () => {
    // Mock location permission granted
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

    // Mock Geolocation
    (Geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce((success) => {
      success({
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      });
    });

    // Mock API response
    mockAxios
      .onGet('https://api.openweathermap.org/data/2.5/weather?lat=37.7749&lon=-122.4194&units=metric&appid=f6cafaaca4769a26d1780f8f52bd6887')
      .reply(200, {
        name: 'San Francisco',
        main: { temp: 18.5 },
        weather: [{ icon: '01d' }],
      });

    const { getByText, getByTestId } = render(<WeatherApp />);

    await waitFor(() => {
      expect(getByText('San Francisco')).toBeTruthy();
      expect(getByText('18.5°C')).toBeTruthy();
      expect(getByTestId('weather-icon').props.source.uri).toBe(
        'https://openweathermap.org/img/wn/01d@2x.png'
      );
    });
  });

  it('renders an error message when location permission is denied', async () => {
    // Mock location permission denied
    (request as jest.Mock).mockResolvedValue(RESULTS.DENIED);

    const { getByText } = render(<WeatherApp />);

    await waitFor(() => {
      expect(getByText('Location permission not granted.')).toBeTruthy();
    });
  });

  it('renders an error message when fetching weather data fails', async () => {
    // Mock location permission granted
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);

    // Mock Geolocation
    (Geolocation.getCurrentPosition as jest.Mock).mockImplementationOnce((success) => {
      success({
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      });
    });

    // Mock API error
    mockAxios
      .onGet('https://api.openweathermap.org/data/2.5/weather?lat=37.7749&lon=-122.4194&units=metric&appid=f6cafaaca4769a26d1780f8f52bd6887')
      .reply(500);

    const { getByText } = render(<WeatherApp />);

    await waitFor(() => {
      expect(getByText('Failed to fetch weather data.')).toBeTruthy();
    });
  });
});
