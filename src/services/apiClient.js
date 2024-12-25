import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://medkort.ru/api/v1'; // Базовый URL API

const apiClient = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const token = await AsyncStorage.getItem('authToken');
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка API');
  }

  return response.json();
};

export default apiClient;
