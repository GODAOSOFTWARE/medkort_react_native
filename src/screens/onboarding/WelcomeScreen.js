import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import StorageService from '../../services/storageService';
import userService from '../../services/userService';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0); // Для отображения процента
  const [isLoaderFinished, setIsLoaderFinished] = useState(false); // Завершен ли лоадер
  const scaleValue = new Animated.Value(1); // Для анимации сердца

  // Анимация сердца
  useEffect(() => {
    const animateHeart = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3, // Увеличение сердца
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Уменьшение сердца
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animateHeart()); // Циклический вызов анимации
    };

    animateHeart();
  }, [scaleValue]);

  // Прогресс-бар
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaderFinished(true);
          return 100;
        }
        return prev + 2; // Увеличение на 2%
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Проверка роли после завершения лоадера
  useEffect(() => {
    if (isLoaderFinished) {
      const checkUserRole = async () => {
        try {
          console.log('WelcomeScreen: Проверка токена и роли пользователя');

          const token = await StorageService.getItem('authToken');
          if (!token) {
            console.log('WelcomeScreen: Токен отсутствует, переход на экран авторизации');
            navigation.replace('Login');
            return;
          }

          const userData = await userService.getUser(token);
          console.log('WelcomeScreen: Данные пользователя:', userData);

          const roleId = userData?.data?.role?.id;

          switch (roleId) {
            case 0: // PATIENT
              navigation.replace('ProductsScreen'); // Кабинет пациента
              break;
            case 1: // SUPER_ADMIN_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'superAdmin', label: 'Супер Администратор' },
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
            case 3: // MANAGER_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'manager', label: 'Менеджер' },
                ],
              });
              break;
            case 4: // REGISTRATOR_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'registrator', label: 'Регистратор' },
                ],
              });
              break;
            case 5: // DOCTOR_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'doctor', label: 'Врач' },
                ],
              });
              break;
            case 6: // PARTNER_ROLE
              navigation.replace('RoleSelectionScreen', {
                options: [
                  { key: 'patient', label: 'Пациент' },
                  { key: 'partner', label: 'Партнер' },
                ],
              });
              break;
            default:
              navigation.replace('Login'); // Неизвестная роль
              break;
          }
        } catch (error) {
          console.error('WelcomeScreen: Ошибка при проверке роли', error);
          navigation.replace('Login');
        }
      };

      checkUserRole();
    }
  }, [isLoaderFinished, navigation]);

  return (
    <LinearGradient colors={['#187bcd', '#4e9af1']} style={styles.container}>
      <View style={styles.iconContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <MaterialCommunityIcons name="heart" size={100} color="red" />
        </Animated.View>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Text style={styles.subtitle}>Идет загрузка приложения...</Text>
      </View>
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>{`${progress.toFixed(0)} %`}</Text>
        <View style={styles.loader}>
          <View style={[styles.loaderProgress, { width: `${progress}%` }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  loader: {
    width: '80%',
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  loaderProgress: {
    height: '100%',
    backgroundColor: 'red',
  },
});
