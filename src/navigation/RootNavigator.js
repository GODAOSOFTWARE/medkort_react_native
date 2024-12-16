/**
 * Путь: ./src/navigation/RootNavigator.js
 * 
 * Этот файл является точкой входа для навигации.
 * - Проверяет состояние авторизации пользователя.
 * - Определяет роль пользователя.
 * - Перенаправляет пользователя на соответствующий экран.
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Локальное хранилище
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Routes } from './routes'; // Импорт маршрутов из routes.js
import AppNavigator from './AppNavigator'; // Универсальный навигатор
import AuthScreen from '../screens/auth/AuthScreen'; // Экран авторизации

const Stack = createStackNavigator(); // Создание Stack Navigator

// RootNavigator — корневой компонент навигации
export default function RootNavigator() {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Авторизован ли пользователь
  const [userRole, setUserRole] = useState(null); // Роль пользователя: patient/doctor

  // Проверка токена и роли пользователя
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken'); // Читаем токен из AsyncStorage
        const role = await AsyncStorage.getItem('userRole'); // Читаем роль пользователя
        if (token && role) {
          setIsAuthenticated(true); // Устанавливаем авторизацию
          setUserRole(role); // Устанавливаем роль пользователя
        } else {
          setIsAuthenticated(false); // Если нет токена или роли — не авторизован
        }
      } catch (error) {
        console.error('Ошибка при проверке токена:', error); // Логируем ошибку
      } finally {
        setIsLoading(false); // Завершаем состояние загрузки
      }
    };

    checkToken();
  }, []); // Пустой массив зависимостей — хук срабатывает один раз при монтировании

  // Показ индикатора загрузки, пока идет проверка токена
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Если пользователь авторизован
          <Stack.Screen
            name="AppNavigator"
            component={() =>
              <AppNavigator routes={userRole === 'patient' ? Routes.patient : Routes.doctor} />
            }
          />
        ) : (
          // Если пользователь не авторизован
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
