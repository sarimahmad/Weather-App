/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import WeatherDetailsScreen from '../Screens/WeatherDetailsScreen';
import Splash from '../Screens/Splash';
const Stack = createNativeStackNavigator();

function MainNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash" >
        <Stack.Screen options={{ headerShown: false }}  name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WeatherDetailsScreen" component={WeatherDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;