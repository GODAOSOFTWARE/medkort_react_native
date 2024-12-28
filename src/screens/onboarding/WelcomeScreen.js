import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService';
import AuthService from '../../services/authService';
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
        navigation.navigate('LoginScreen');
        return;
      }

      if (!pinCode) {
        navigation.navigate('PinSetupScreen');
        return;
      }

      if (!userRole) {
        // Если роли нет, делаем запрос к API
        const userData = await AuthService.getUser(authToken);
        const fetchedRole = userData?.data?.role?.value;

        if (!fetchedRole) {
          throw new Error('Роль пользователя не определена.');
        }

        await StorageService.setItem('userRole', fetchedRole);
        redirectToScreen(fetchedRole, navigation, userData.data.role.name);
      } else {
        // Если роль есть в хранилище, перенаправляем
        redirectToScreen(userRole, navigation);
      }
    } catch (error) {
      console.error('Ошибка обработки кнопки Start:', error);
      Alert.alert('Ошибка', 'Не удалось обработать данные.');
    }
  };

  const redirectToScreen = (role, navigation, roleName = '') => {
    switch (role) {
      case 'PATIENT':
        navigation.navigate('PatientProfileScreen');
        break;
      case 'ADMIN_ROLE':
      case 'SUPER_ADMIN_ROLE':
      case 'MANAGER_ROLE':
      case 'REGISTRATOR_ROLE':
      case 'DOCTOR_ROLE':
      case 'PARTNER_ROLE':
        navigation.navigate('RoleSelectionScreen', {
          options: [
            { key: 'PATIENT', label: 'Пациент', icon: 'account' },
            { key: role, label: roleName || 'Другая роль', icon: 'shield-account' },
          ],
        });
        break;
      default:
        Alert.alert('Ошибка', 'Роль не распознана.');
        navigation.navigate('LoginScreen');
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
