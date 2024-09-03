import axios from 'axios';

import { Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

const API_KEY = 'f6cafaaca4769a26d1780f8f52bd6887';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall';

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
  };
  weather: [
    {
      icon: string;
      main: string;
    }
  ];
}

interface WeatherData {
  daily: DailyWeather[];
}

export const fetchWeeklyWeatherData = (latitude: number, longitude: number): Promise<WeatherData> => {
  return axios.get(`${BASE_URL}?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`)
    .then(response => response.data);
};


export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  });
};


interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export const fetchLocationData = (locationName: string): Promise<LocationData[]> => {
  return axios.get(`${GEO_BASE_URL}?q=${locationName}&limit=5&appid=${API_KEY}`)
    .then(response => response.data);
};
