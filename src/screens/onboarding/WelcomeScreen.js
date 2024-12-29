import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';

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

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="hospital-box" size={120} color="#FFFFFF" />
        <Text style={[styles.title, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Welcome to Medkort
        </Text>
        <Text style={[styles.subtitle, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Just a few quick steps to get started
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  startButtonText: {
    color: '#333333',
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
