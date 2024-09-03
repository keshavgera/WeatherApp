import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchWeeklyWeatherData, getCurrentLocation } from './WeatherService';

interface DailyForecast {
  day: string;
  temperature: number;
  icon: string;
}

const WeeklyWeatherComponent: React.FC = () => {
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const { latitude, longitude } = await getCurrentLocation();

        console.log("K_______ WeeklyWeatherComponent lat ", latitude );
    console.log("K_______ WeeklyWeatherComponent lon ", longitude );

        const data = await fetchWeeklyWeatherData(latitude, longitude);
        console.log("K_______ WeeklyWeatherComponent data  ", data  );

        const forecasts = data.daily.map(day => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          return {
            day: dayName,
            temperature: Math.round(day.temp.day),
            icon: day.weather[0].icon,
          };
        });

        setWeeklyForecast(forecasts);
      } catch (error) {
        console.error("Failed to load weather data", error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderForecastItem = ({ item }: { item: DailyForecast }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.day}>{item.day}</Text>
      <Text style={styles.temperature}>{item.temperature}°C</Text>
      <Image
        style={styles.weatherIcon}
        source={{ uri: `https://openweathermap.org/img/w/${item.icon}.png` }}
      />
    </View>
  );

  return (
    <FlatList
      data={weeklyForecast}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderForecastItem}
      contentContainerStyle={styles.forecastList}
    />
  );
};

const styles = StyleSheet.create({
  forecastList: {
    alignItems: 'center',
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  day: {
    fontSize: 20,
    flex: 1,
  },
  temperature: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default WeeklyWeatherComponent;
