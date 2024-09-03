import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchLocationData } from './WeatherService';

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface SearchComponentProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchLocation = async () => {
    setLoading(true);
    try {
      const data = await fetchLocationData(query);
      setLocations(data);
    } catch (error) {
      console.error('Error fetching location data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {

    console.log("K_______ handleLocationSelect lat ", lat );
    console.log("K_______ handleLocationSelect lon ", lon );
    setLocations([]);
    setQuery('');
    onLocationSelect(lat, lon);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchLocation} />
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={locations}
        keyExtractor={(item) => `${item.lat}-${item.lon}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationSelect(item.lat, item.lon)}>
            <Text style={styles.locationItem}>{`${item.name}, ${item.country}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchComponent;
