import AsyncStorage from '@react-native-async-storage/async-storage';

const set = async (key, data) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

// eslint-disable-next-line consistent-return
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
  }
};

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export default {
  set,
  get,
  remove
};
