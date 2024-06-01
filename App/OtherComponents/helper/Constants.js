import {Dimensions, Platform} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// Based on iPhone 5s's scale
const baseWidth = 320;
const baseHeight = 568;

export const scale = size => (SCREEN_WIDTH / baseWidth) * size;
export const verticalScale = size => (SCREEN_HEIGHT / baseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isAndroid = Platform.OS === 'android';
const isIphone = Platform.OS === 'ios';
const isSmallScreen = SCREEN_WIDTH < 360;
const isLargeScreen = SCREEN_WIDTH >= 768;

const scaledSize = size => {
  if (isAndroid && isSmallScreen) {
    return scale(size); // smaller scale for small Android phones
  } else if (isAndroid && !isSmallScreen) {
    return moderateScale(size); // moderate scale for large Android phones
  } else if (isIphone && isSmallScreen) {
    return scale(size); // smaller scale for small iPhones
  } else if (isIphone && !isSmallScreen) {
    return moderateScale(size); // moderate scale for large iPhones
  } else if (isLargeScreen) {
    return verticalScale(size); // vertical scale for tablets
  }

  return size;
};

export default scaledSize;

export const API_KEY = 'd1aba7d3b53d42e4893164747243005';

export const API_KEY2 = 'b5e0d0c4bea1fe23a607a7e146ffb93e';
