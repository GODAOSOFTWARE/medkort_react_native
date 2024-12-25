import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

export default storageService;
