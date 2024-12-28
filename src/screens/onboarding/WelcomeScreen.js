import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import StorageService from '../../services/storageService';
import userService from '../../services/userService';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const scaleValue = new Animated.Value(1);

  // Определение устройства и экрана
  const { width, height } = Dimensions.get('window');
  const sizeCategory = getSizeCategory();
  const deviceBrand = Platform.OS === 'ios' ? 'iPhone' : 'Android';
  const sizeSymbol = {
    small: 'S',
    medium: 'M',
    large: 'L',
  }[sizeCategory];

  useEffect(() => {
    console.log(`Экран запущен: "Экран приветствия"`);
    console.log(`Определено устройство: ${deviceBrand}`);
    console.log(`Размер экрана: ширина - ${width}px, высота - ${height}px`);
    console.log(`Определена категория экрана: ${sizeCategory}_Screen`);
    console.log(`Определен символ: ${sizeSymbol}`);
    console.log(`Стили отрисованы в соответствии с категорией: ${sizeSymbol}`);
  }, []);

  // Анимация иконки
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Прогресс-бар
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaderFinished(true);
          return 100;
        }
        return prev + 5;
      });
    }, 125);

    return () => clearInterval(interval);
  }, []);

  // Проверка токена и роли
  useEffect(() => {
    if (isLoaderFinished) {
      const checkUserRole = async () => {
        try {
          const token = await StorageService.getItem('authToken');
          if (!token) {
            navigation.replace('Login');
            return;
          }

          const userData = await userService.getUser(token);
          const roleId = userData?.data?.role?.id;

          switch (roleId) {
            case 0: // PATIENT
              navigation.replace('ProductsScreen');
              break;
            case 1: // SUPER_ADMIN_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'superAdmin', label: 'Администратор' },
                ],
              });
              break;
            case 2: // ADMIN_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'admin', label: 'Администратор' },
                ],
              });
              break;
            default:
              navigation.replace('Login');
              break;
          }
        } catch (error) {
          console.error('Ошибка при проверке роли', error);
          navigation.replace('Login');
        }
      };

      checkUserRole();
    }
  }, [isLoaderFinished, navigation]);

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles(sizeCategory).container}>
      <View style={styles(sizeCategory).iconContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <MaterialCommunityIcons name="hospital-box" size={responsiveSizes.icon[sizeCategory]} color="#FFFFFF" />
        </Animated.View>
        <Text style={styles(sizeCategory).title}>Приложение загружается</Text>
        <Text style={styles(sizeCategory).subtitle}>Проверяем наличие учетной записи...</Text>
      </View>
      <View style={styles(sizeCategory).loaderContainer}>
        <Text style={styles(sizeCategory).loaderText}>{`${progress.toFixed(0)} %`}</Text>
        <View style={styles(sizeCategory).loader}>
          <View style={[styles(sizeCategory).loaderProgress, { width: `${progress}%` }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = (sizeCategory) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#FFFFFF',
      fontSize: responsiveSizes.text[sizeCategory],
      marginTop: responsiveSizes.margin[sizeCategory],
      fontWeight: 'bold',
    },
    subtitle: {
      color: '#E0E0E0',
      fontSize: responsiveSizes.text[sizeCategory] * 0.8,
      marginTop: responsiveSizes.margin[sizeCategory] / 2,
    },
    loaderContainer: {
      padding: responsiveSizes.padding[sizeCategory],
      alignItems: 'center',
    },
    loaderText: {
      color: '#FFFFFF',
      fontSize: responsiveSizes.text[sizeCategory] * 0.9,
      marginBottom: responsiveSizes.margin[sizeCategory] / 2,
    },
    loader: {
      width: '80%',
      height: responsiveSizes.button[sizeCategory] / 8,
      backgroundColor: '#355A90',
      borderRadius: responsiveSizes.margin[sizeCategory] / 2,
      overflow: 'hidden',
    },
    loaderProgress: {
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
  });
