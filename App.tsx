import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WeatherApp from './src/Components/WeatherApp'
import SearchComponent from './src/Components/SearchComponent'

const App = () => {
  return (
    <View style={{flex:1}}>
      <Text>App</Text>
      <SearchComponent />
      <WeatherApp />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})