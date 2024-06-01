import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  WeatherDetailsScreen: {city: string};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WeatherDetailsScreen'
>;
type HomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'WeatherDetailsScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [cityName, setCityName] = useState<string>('');

  const NavigateToWeatherDetailScreen = () => {
    if (cityName) {
      navigation.navigate('WeatherDetailsScreen', {
        city: cityName,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Input.webp')}
        style={styles.mainConatiner}>
        <Text style={styles.titleText}>Weather App</Text>
        <View style={styles.TextInputContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter the city name"
            placeholderTextColor={'white'}
            onChangeText={newText => setCityName(newText)}
            defaultValue={cityName}
            
            returnKeyType={'search'}
          />
          <TouchableOpacity
            style={styles.submitButtonContaner}
            onPress={NavigateToWeatherDetailScreen}>
            <Text style={styles.submit_btn_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainConatiner: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextInputContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  TextInput: {
    fontSize: 16,
    color: 'black',
    width: '85%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitButtonContaner: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 70,
    borderRadius: 10,
  },
  submit_btn_text: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
