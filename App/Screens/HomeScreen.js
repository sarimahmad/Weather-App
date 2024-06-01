import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_WIDTH} from '../OtherComponents/helper/Constants';

const HomeScreen = ({navigation}) => {
  const [cityName, setCityName] = useState('');
  const NavigateToWeatherDetailScreen = () => {
    if (cityName) {
      navigation.navigate('WeatherDetailsScreen', {
        city: cityName,
      });
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.mainConatiner}>
        <Text style={styles.titleText}>Weather App</Text>
        <View style={styles.TextInputContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter the city name"
            placeholderTextColor={'#454545'}
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
      </View>
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
    width: SCREEN_WIDTH - 30,
    alignItems: 'center',
    alignSelf: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  TextInput: {
    fontSize: 14,
    color: 'black',
    width: '85%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitButtonContaner: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  submit_btn_text: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
