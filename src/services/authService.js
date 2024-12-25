import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authService = {
  login: async (email, password) => {
    const data = await apiClient('login', 'POST', { email, password });
    await AsyncStorage.setItem('authToken', data.access_token);
    return data;
  },
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
  },
};

export default authService;
