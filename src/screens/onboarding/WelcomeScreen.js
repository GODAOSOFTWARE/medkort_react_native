import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StorageService from '../../services/storageService';
import UserService from '../../services/userService';

export default function WelcomeScreen({ navigation }) {
  const handleStart = async () => {
    try {
      // Получение токена из хранилища
      const authToken = await StorageService.getItem('authToken');
      console.log(`authToken: ${authToken}`);

      // Если токен отсутствует, перенаправляем на экран логина
      if (!authToken) {
        navigation.navigate('LoginScreen');
        return;
      }

      // Получение роли из хранилища
      let userRole = await StorageService.getItem('userRole');
      console.log(`userRole from storage: ${userRole}`);

      // Если роли нет, запрашиваем данные пользователя через UserService
      if (!userRole) {
        const userData = await UserService.getUser(authToken);
        userRole = userData?.data?.role?.value;
        console.log(`userRole from API: ${userRole}`);

        if (userRole) {
          await StorageService.setItem('userRole', userRole);
        } else {
          throw new Error('Роль пользователя не определена.');
        }
      }

      // Переход в зависимости от роли
      switch (userRole) {
        case 'PATIENT':
          navigation.navigate('PatientProfileScreen');
          break;
        default:
          const userData = await UserService.getUser(authToken);
          const options = [
            { key: 'PATIENT', label: 'Пациент', icon: 'account' },
            { key: userRole, label: userData.data.role.name, icon: 'shield-account' },
          ];
          navigation.navigate('RoleSelectionScreen', { options });
          break;
      }
    } catch (error) {
      console.error('Ошибка обработки кнопки Start:', error);
      Alert.alert('Ошибка', 'Не удалось обработать запрос. Попробуйте снова.');
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.title}>Добро пожаловать в Медкорт</Text>
        <Text style={styles.subtitle}>Начните работу, выбрав подходящий вариант</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Старт</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  startButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FFA500',
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
