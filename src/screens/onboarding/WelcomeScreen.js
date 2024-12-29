import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';

export default function WelcomeScreen({ navigation }) {
  const [sizeCategory, setSizeCategory] = useState('');

  useEffect(() => {
    const category = getSizeCategory();
    setSizeCategory(category);
    console.log(`Экран: WelcomeScreen, Категория экрана: ${category}`);
  }, []);

  const handleStart = async () => {
    try {
      const authToken = await StorageService.getItem('authToken');
      const pinCode = await StorageService.getItem('userPin');
      const userRole = await StorageService.getItem('userRole');

      console.log(`authToken: ${authToken}, pinCode: ${pinCode}, userRole: ${userRole}`);

      if (!authToken) {
        console.log('Нет токена, переходим на экран авторизации.');
        navigation.navigate('LoginScreen'); // Перенаправление на экран авторизации
        return;
      }

      if (!pinCode) {
        console.log('Есть токен, но нет пинкода, переходим на экран установки пинкода.');
        navigation.navigate('PinSetupScreen'); // Перенаправление на экран установки пинкода
        return;
      }

      if (authToken && pinCode && !userRole) {
        console.log('Есть токен и пинкод, но нет роли. Переходим к выбору роли.');
        navigation.navigate('RoleSelectionScreen', {
          options: [
            { key: 'PATIENT', label: 'Пациент', icon: 'account' },
            { key: 'DOCTOR', label: 'Доктор', icon: 'stethoscope' },
            { key: 'ADMIN', label: 'Администратор', icon: 'account-tie' },
          ],
        });
        return;
      }

      if (authToken && pinCode && userRole) {
        console.log('Все данные есть, переходим на RoleBasedScreen.');
        navigation.navigate('RoleBasedScreen', { roleKey: userRole });
      }
    } catch (error) {
      console.error('Ошибка обработки кнопки Start:', error);
      Alert.alert('Ошибка', 'Не удалось обработать данные.');
    }
  };

  if (!sizeCategory) {
    return null; // Пока категория экрана не определена
  }

  const dynamicStyles = styles(sizeCategory);

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={dynamicStyles.container}>
      <View style={dynamicStyles.iconContainer}>
        <MaterialCommunityIcons
          name="hospital-box"
          size={responsiveSizes.icon[sizeCategory]} // Адаптивный размер иконки
          color="#FFFFFF"
        />
        <Text style={dynamicStyles.title}>
          Добро пожпловать в медкорт
        </Text>
        <Text style={dynamicStyles.subtitle}>
          Для запуска приложения нажмите кнопку "Начать работу"
        </Text>
      </View>
      <View style={dynamicStyles.footer}>
        <TouchableOpacity
          style={dynamicStyles.startButton}
          onPress={handleStart}
        >
          <Text style={dynamicStyles.startButtonText}>
            Начать работу
          </Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.footerText}>
          Перед использованием прочтите{' '}
          <Text style={dynamicStyles.link}>Условия использования</Text> и{' '}
          <Text style={dynamicStyles.link}>Политику конфиденциальности</Text>,{' '}
         
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = (sizeCategory) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsiveSizes.padding[sizeCategory], // Адаптивные отступы
    },
    iconContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#FFFFFF',
      marginTop: responsiveSizes.margin[sizeCategory], // Адаптивный отступ
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: responsiveSizes.text[sizeCategory], // Адаптивный размер текста
    },
    subtitle: {
      color: '#E0E0E0',
      marginTop: responsiveSizes.margin[sizeCategory], // Адаптивный отступ
      textAlign: 'center',
      fontSize: responsiveSizes.text[sizeCategory], // Адаптивный размер текста
    },
    footer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: responsiveSizes.padding[sizeCategory], // Адаптивные отступы
    },
    startButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsiveSizes.margin[sizeCategory], // Адаптивный нижний отступ
      paddingVertical: responsiveSizes.button[sizeCategory], // Адаптивный размер кнопки
      borderRadius: responsiveSizes.margin[sizeCategory], // Адаптивный радиус
      shadowColor: '#000',
      shadowOffset: { width: 0, height: responsiveSizes.margin[sizeCategory] }, // Адаптивная тень
      shadowOpacity: 0.3,
      shadowRadius: responsiveSizes.margin[sizeCategory],
      elevation: 6,
    },
    startButtonText: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: responsiveSizes.text[sizeCategory], // Адаптивный размер текста
    },
    footerText: {
      color: '#E0E0E0',
      textAlign: 'center',
      fontSize: responsiveSizes.text[sizeCategory], // Адаптивный размер текста
    },
    link: {
      color: '#FFA500',
      textDecorationLine: 'underline',
      fontSize: responsiveSizes.text[sizeCategory], // Адаптивный размер текста
    },
  });
