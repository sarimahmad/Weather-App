/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '../OtherComponents/helper/Constants';

type RootStackParamList = {
  Home: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp;
};

const Splash: React.FC<Props> = ({navigation}) => {
  const navigate = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const timer = setTimeout(navigate, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Image
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/splash.webp')}
      />
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop: SCREEN_HEIGHT / 4,
        }}>
        <Text style={styles.bold_large}>Weather {'\n'} App</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bold_large: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
export default Splash;
