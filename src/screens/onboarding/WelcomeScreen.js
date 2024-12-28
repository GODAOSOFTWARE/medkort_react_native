import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';
import StorageService from '../../services/storageService'; // Работа с AsyncStorage
import AuthService from '../../services/authService'; // Работа с API

export default function WelcomeScreen({ navigation }) {
  const [sizeCategory, setSizeCategory] = useState('');

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    const category = getSizeCategory();
    setSizeCategory(category);
    console.log(`Экран: WelcomeScreen, Категория экрана: ${category}`);
  }, []);

  const handleStart = async () => {
    try {
      const authToken = await StorageService.getItem('authToken'); // Получаем токен
      const pinCode = await StorageService.getItem('pinCode'); // Получаем PIN-код

      console.log(`authToken: ${authToken}, pinCode: ${pinCode}`);

      if (!authToken) {
        // Перенаправление на экран авторизации
        navigation.navigate('Login');
        return;
      }

      if (!pinCode) {
        // Перенаправление на экран установки PIN-кода
        navigation.navigate('PinSetup');
        return;
      }

      // Получение данных пользователя по токену
      const user = await AuthService.getUser(authToken);
      console.log(`User data: ${JSON.stringify(user)}`);

      if (user?.role === 'admin') {
        navigation.navigate('AdminProfile');
      } else if (user?.role === 'doctor') {
        navigation.navigate('DoctorProfile');
      } else if (user?.role === 'patient') {
        navigation.navigate('PatientProfile');
      } else {
        navigation.navigate('RoleSelection');
      }
    } catch (error) {
      console.error('Ошибка обработки кнопки Start:', error);
    }
  };

  if (!sizeCategory) {
    return null; // Показываем пустой экран, пока не определена категория
  }

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="hospital-box" size={120} color="#FFFFFF" />
        <Text style={[styles.title, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Welcome to Codefinity
        </Text>
        <Text style={[styles.subtitle, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Just a few quick questions so we create the learning track for you
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.startButton, { paddingVertical: responsiveSizes.button[sizeCategory] }]}
          onPress={handleStart}
        >
          <Text style={[styles.startButtonText, { fontSize: responsiveSizes.text[sizeCategory] }]}>
            Start
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          By continuing I agree with{' '}
          <Text style={styles.link}>Terms & conditions</Text>,{' '}
          <Text style={styles.link}>Privacy policy</Text>,{' '}
          <Text style={styles.link}>Cookie policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0E0E0',
    marginTop: 5,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  startButton: {
    backgroundColor: '#FFA500',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#E0E0E0',
    fontSize: 12,
    textAlign: 'center',
  },
  link: {
    color: '#FFA500',
    textDecorationLine: 'underline',
  },
});
