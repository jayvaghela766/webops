import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const objectsEmptyStringToUndefined = (data) => {
  const newData = {...data};
  Object.keys(newData).forEach((item) => {
    newData[item] = data[item] == '' ? undefined : data[item];
  });

  return newData;
};

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;
