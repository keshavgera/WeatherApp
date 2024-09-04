import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './src/Screens/TodoList';
import TodoListCRUD from './src/Screens/TodoListCRUD';
import Login from './src/Components/Login';
import DetailsScreen from './src/Components/DetailsScreen';
import WeatherApp from './src/Components/WeatherApp';

type RootStackParamList = {
  WeatherApp: undefined;
  Home: undefined;
  CustomModal: undefined;
  Login: undefined;
  Todo: undefined;
  CRUD: undefined;
  Details: { name: string, email: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{title:'Login'}} name="Login" component={Login} />
        <Stack.Screen name="WeatherApp" component={WeatherApp} />
        <Stack.Screen name="Todo" component={TodoList} />
        <Stack.Screen name="CRUD" component={TodoListCRUD} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
