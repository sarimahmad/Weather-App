import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_KEY, API_KEY2} from '../OtherComponents/helper/Constants';
import Geolocation from '@react-native-community/geolocation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  WeatherDetailsScreen: {city: string};
};

type WeatherDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WeatherDetailsScreen'
>;

type WeatherDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'WeatherDetailsScreen'
>;

type Props = {
  navigation: WeatherDetailsScreenNavigationProp;
  route: WeatherDetailsScreenRouteProp;
};

type WeatherData = {
  location: {
    name: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
    };
    temp_c: number;
    temp_f: number;
  };
};

type ForecastData = {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
};

const WeatherDetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const {city} = route.params;
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null,
  );
  const [forecast, setForecast] = useState<ForecastData['list'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<string>('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCurrentWeather(city), fetchForecast(city)])
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [city]);

  const fetchForecast = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY2}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn('City name is Wrong or NetWork Error');
    }
    const data = await response.json();
    setForecast(data.list);
  };

  const fetchCurrentWeather = async (city: string) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&alerts=no`;
    const response = await fetch(url);
    if (!response.ok) {
      navigation.goBack();
      console.warn('City name is Wrong or NetWork Error');
    }
    const data = await response.json();
    setCurrentWeather(data);
  };

  const fetchCurrentWeatherUsingLatLongs = async (location: string) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no&alerts=no`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn('City name is Wrong or NetWork Error');
    }
    const data = await response.json();
    setCurrentWeather(data);
  };

  const fetchWeatherForecastUsingLatLongs = async (location: string) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${
      location.split(',')[0]
    }&lon=${location.split(',')[1]}&appid=${API_KEY2}&units=${unit}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn('City name is Wrong or NetWork Error');
    }
    const data = await response.json();
    setForecast(data.list);
  };

  const handleLocationPress = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      getLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.error('Location permission denied');
        setLoading(false);
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetchCurrentWeatherUsingLatLongs(`${latitude},${longitude}`);
        fetchWeatherForecastUsingLatLongs(`${latitude},${longitude}`);
      },
      error => {
        console.error(error);
        setLoading(false);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.forecastContainer}>
      <Text style={styles.forecastDate}>
        {new Date(item.dt * 1000).toLocaleTimeString()}
      </Text>
      <Text style={styles.forecastDate}>
        {new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
        })}
      </Text>
      <Image
        style={styles.weatherIcon}
        source={{
          uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }}
      />
      <Text style={styles.forecastText}>
        {item.weather[0].description} -{' '}
        {unit === 'metric'
          ? `${item.main.temp.toFixed(1)}°C`
          : `${((item.main.temp * 9) / 5 + 32).toFixed(1)}°F`}
      </Text>
      <Text style={styles.additionalInfo}>Humidity: {item.main.humidity}%</Text>
      <Text style={styles.additionalInfo}>Wind: {item.wind.speed} m/s</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      ) : (
        <View style={styles.container}>
          <Button
            title="Get Weather at My Location"
            onPress={handleLocationPress}
          />
          <Button
            title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
            onPress={toggleUnit}
          />
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.cityName}>
              {currentWeather?.location?.name}
            </Text>
            {currentWeather && (
              <View>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri: `https:${currentWeather?.current?.condition.icon}`,
                  }}
                />
                <Text style={styles.weatherCondition}>
                  {currentWeather?.current?.condition.text}
                </Text>
                <Text style={styles.temperature}>
                  Temperature:{' '}
                  {unit === 'metric'
                    ? `${currentWeather?.current?.temp_c}°C`
                    : `${currentWeather?.current?.temp_f}°F`}
                </Text>
              </View>
            )}
          </View>
          <FlatList
            data={forecast}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={renderItem}
            initialNumToRender={4}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WeatherDetailsScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  currentWeatherContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  weatherSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black', // Ensure text is visible
  },
  weatherIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  weatherCondition: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: 'black', // Ensure text is visible
  },
  temperature: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: 'black', // Ensure text is visible
  },
  forecastContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 15,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Ensure text is visible
  },
  forecastText: {
    fontSize: 14,
    color: 'black', // Ensure text is visible
  },
  additionalInfo: {
    fontSize: 12,
    color: 'black', // Ensure text is visible
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginLeft: 5,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
