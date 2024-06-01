import {StatusBar, View} from 'react-native';
import React from 'react';
import MainNavigation from './App/Navigations/homeNavigation';

function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={true} />
      <MainNavigation />
    </View>
  );
}

export default App;
