import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Градиент для кнопок
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService'; // Импорт StorageService

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params;

  // Обработчик выбора роли
  const handleRoleSelect = (roleKey) => {
    console.log(`Выбрано: ${roleKey}`);
    navigation.navigate('RoleBasedScreen', { roleKey });
  };

  // Сброс токена и переход на WelcomeScreen
  const handleDisconnect = async () => {
    try {
      console.log("Disconnecting and resetting navigation...");
      await StorageService.removeItem('authToken'); // Сбрасываем токен
      await StorageService.removeItem('pinCode'); // Сбрасываем пин-код
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      console.error('Ошибка при отключении:', error);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>ВЫБЕРИТЕ РОЛЬ</Text>
      <Text style={styles.subtitle}>Используйте возможности Медкорт</Text>
    

      {/* Карточки ролей */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.cardContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']} // Градиент карточек
            style={styles.gradient}
          >
            <Text style={styles.cardText}>{option.label}</Text>
            <MaterialCommunityIcons
              name={option.icon || 'account-circle'} // Иконка из параметра или стандартная
              size={28}
              color={
                option.key === 'patient'
                  ? '#34A853'
                  : option.key === 'admin'
                  ? '#FBBC05'
                  : '#4285F4'
              } // Цвет иконки
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}

      {/* Кнопка Disconnect */}
      <TouchableOpacity style={styles.disconnectContainer} onPress={handleDisconnect}>
        <Text style={[styles.cardText, { color: '#FFFFFF' }]}>Назад</Text>
        <MaterialCommunityIcons
          name="logout"
          size={28}
          color="#FFFFFF" // Белый значок для красной кнопки
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Сноска */}
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
  mainText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Material Design тень
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
    backgroundColor: '#D32F2F', // Красная кнопка
  },
  footer: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FFA726', // Оранжевый цвет ссылок
    fontWeight: 'bold',
  },
});