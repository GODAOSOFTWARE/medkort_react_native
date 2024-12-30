import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService'; // Импорт StorageService

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params;

  // Логика для выбора роли
  const handleRoleSelect = (roleKey) => {
    console.log(`Выбрано: ${roleKey}`);
    navigation.navigate('RoleBasedScreen', { roleKey });
  };

  // Логика для обработки выхода (Назад)
  const handleDisconnect = async () => {
    try {
      console.log('Начинаем процесс отключения...');
      
      // Удаляем PIN-код
      await StorageService.removeItem('pinCode');
      console.log('PIN-код успешно удален');
      
      // Удаляем токен
      await StorageService.removeItem('authToken');
      console.log('Токен успешно удален');
  
      // Удаляем роль пользователя
      await StorageService.removeItem('userRole');
      console.log('Роль пользователя успешно удалена');
      
      // Проверяем, что данные успешно удалены
      const pinCode = await StorageService.getItem('pinCode');
      const authToken = await StorageService.getItem('authToken');
      const userRole = await StorageService.getItem('userRole');
      
      if (!pinCode && !authToken && !userRole) {
        console.log('Данные успешно удалены из хранилища. Переход на WelcomeScreen...');
        // Навигация на WelcomeScreen
        navigation.navigate('WelcomeScreen');
      } else {
        console.error('Данные не были полностью удалены:');
        if (pinCode) console.error(`PIN-код еще существует: ${pinCode}`);
        if (authToken) console.error(`Токен еще существует: ${authToken}`);
        if (userRole) console.error(`Роль пользователя еще существует: ${userRole}`);
        Alert.alert(
          'Ошибка',
          'Не удалось полностью удалить данные. Попробуйте еще раз.'
        );
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при завершении работы.');
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text style={styles.title}>ВЫБЕРИТЕ РОЛЬ</Text>
      <Text style={styles.subtitle}>Используйте возможности Медкорт</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.cardContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
            style={styles.gradient}
          >
            <Text style={styles.cardText}>{option.label}</Text>
            <MaterialCommunityIcons
              name={option.icon || 'account-circle'}
              size={28}
              color={
                option.key === 'PATIENT'
                  ? '#34A853'
                  : option.key === 'ADMIN'
                  ? '#FBBC05'
                  : '#4285F4'
              }
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.disconnectContainer} onPress={handleDisconnect}>
        <Text style={[styles.cardText, { color: '#FFFFFF' }]}>Назад</Text>
        <MaterialCommunityIcons
          name="logout"
          size={28}
          color="#FFFFFF"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing I agree with{' '}
        <Text style={styles.link}>Terms & conditions</Text>,{' '}
        <Text style={styles.link}>Privacy policy</Text>,{' '}
        <Text style={styles.link}>Cookie policy</Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  icon: {
    marginLeft: 10,
  },
  disconnectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#D32F2F',
  },
  footer: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FFA726',
    fontWeight: 'bold',
  },
});