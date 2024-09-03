import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WeatherApp from './src/Components/WeatherApp'
import WeeklyWeatherComponent from './src/Components/WeeklyWeatherComponent'
import WeatherAppSearch from './src/Components/WeatherAppSearch'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      
      <WeatherAppSearch />      
      <WeatherApp />
      <WeeklyWeatherComponent />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})