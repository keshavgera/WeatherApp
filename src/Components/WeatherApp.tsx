import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { API_KEY } from '../helpers/config';

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'android') {
        permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else if (Platform.OS === 'ios') {
        permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (permission === RESULTS.GRANTED) {
        getLocation();
      } else {
        setError('Location permission not granted.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to request location permission.');
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // console.log("K_______ latitude ", latitude );
        // console.log("K_______ longitude ", longitude );
        
        fetchWeather(28.4089, 77.3178);
      },
      error => {
        console.error(error);
        setError('Failed to get location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      console.log("K_______ apiUrl ", apiUrl );

      const response = await axios.get(apiUrl);
      const { name } = response.data;
      const { temp } = response.data.main;
      const { icon } = response.data.weather[0];
      
      console.log("K_______ name ", name );
      console.log("K_______ temp ", temp  );
      console.log("K_______ icon ", icon  );

      const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log("K_______ url ", url  );

      setLocation(name);
      setTemperature(temp);
      setWeatherIcon(url);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data.');
    }
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {location && <Text style={styles.text}>{location}</Text>}
          {temperature !== null && (
            <Text style={styles.text}>{temperature}°C</Text>
          )}
          {weatherIcon && (
            <Image source={{ uri: weatherIcon }} style={styles.weatherIcon} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 24,
    margin: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default WeatherApp;
