/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import WeatherDetailsScreen from '../Screens/WeatherDetailsScreen';
const Stack = createNativeStackNavigator();

function MainNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" >

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WeatherDetailsScreen" component={WeatherDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
