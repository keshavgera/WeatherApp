import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../helpers/config';

interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

const WeatherAppSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('Faridabad');
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Function to search for locations by name
  const searchLocations = async () => {
    try {

      const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}`;

      console.log("K_____ searchLocations url ", url);

      const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}`);
      
      


      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Function to fetch weather data for a selected location
  const fetchWeatherData = async (location: Location) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`);
      
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`

      console.log("K_____ fetchWeatherData url ", url);
      
      
      setWeatherData({
        temperature: response.data.current.temp_c,
        description: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
      });
      setSelectedLocation(location);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ borderColor: 'gray', paddingHorizontal:10, borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Search" onPress={searchLocations} />

      {locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => `${item.lat}-${item.lon}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => fetchWeatherData(item)}>
              <Text>{item.name}, {item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {weatherData && (
        <View style={{ marginTop: 20 }}>
          <Text>Location: {selectedLocation?.name}</Text>
          <Text>Temperature: {weatherData.temperature}°C</Text>
          <Text>Condition: {weatherData.description}</Text>
          <Image source={{ uri: `https:${weatherData.icon}` }} style={{ width: 50, height: 50 }} />
        </View>
      )}
    </View>
  );
};

export default WeatherAppSearch;
