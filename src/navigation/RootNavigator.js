/**
 * Файл: RootNavigator.js
 *
 * Что содержит:
 * - Проверку токена из локального хранилища.
 * - Определение роли пользователя на основе токена.
 * - Логику отображения ролевого навигатора или экрана авторизации.
 *
 * За что отвечает:
 * - Главный навигатор приложения.
 * - Перенаправляет пользователя на экран авторизации или в кабинет в зависимости от наличия токена и роли.
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // Для декодирования токена
import PatientNavigator from './PatientNavigator'; // Навигатор для пациента
import DoctorNavigator from './DoctorNavigator'; // Навигатор для врача
import AdminNavigator from './AdminNavigator'; // Навигатор для администратора
import CallCenterNavigator from './CallCenterNavigator'; // Навигатор для колл-центра
import AuthScreen from '../screens/AuthScreen'; // Экран авторизации

export default function RootNavigator() {
  const [role, setRole] = useState(null); // Хранит роль пользователя
  const [isLoading, setIsLoading] = useState(true); // Указывает, идёт ли процесс проверки токена

  /**
   * Проверяем токен и определяем роль пользователя
   */
  const fetchUserRole = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Извлекаем токен из хранилища
      if (!token) {
        throw new Error('Токен отсутствует'); // Если токена нет, выдаём ошибку
      }

      // Декодируем токен и извлекаем роль
      const decodedToken = jwtDecode(token); // Декодирование токена
      const userRole = decodedToken.role; // Извлечение роли

      if (!userRole) {
        throw new Error('Роль пользователя не найдена'); // Ошибка, если роль не указана
      }

      setRole(userRole); // Устанавливаем роль пользователя
    } catch (error) {
      console.error('Ошибка при обработке токена:', error);
      setRole(null); // Если ошибка, сбрасываем роль
    } finally {
      setIsLoading(false); // Завершаем процесс загрузки
    }
  };

  /**
   * Проверяем токен при загрузке компонента
   */
  useEffect(() => {
    fetchUserRole();
  }, []);

  /**
   * Если идёт процесс проверки токена, показываем индикатор загрузки
   */
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  /**
   * Если токена нет или он недействителен, показываем экран авторизации
   */
  if (!role) {
    return <AuthScreen />;
  }

  /**
   * Выбираем ролевой навигатор на основе роли пользователя
   */
  switch (role) {
    case 'patient':
      return <PatientNavigator />;
    case 'doctor':
      return <DoctorNavigator />;
    case 'admin':
      return <AdminNavigator />;
    case 'callcenter':
      return <CallCenterNavigator />;
    default:
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Роль не определена. Обратитесь в поддержку.</Text>
        </View>
      );
  }
}
