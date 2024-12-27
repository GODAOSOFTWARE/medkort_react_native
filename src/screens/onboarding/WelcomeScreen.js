import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import StorageService from '../../services/storageService';
import userService from '../../services/userService';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const scaleValue = new Animated.Value(1);

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
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.iconContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <MaterialCommunityIcons name="hospital-box" size={120} color="#FFFFFF" />
        </Animated.View>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Text style={styles.subtitle}>Подготовка приложения...</Text>
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
    color: '#E0E0E0',
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
    backgroundColor: '#355A90',
    borderRadius: 5,
    overflow: 'hidden',
  },
  loaderProgress: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});
