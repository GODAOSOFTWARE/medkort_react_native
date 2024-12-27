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
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>BOOST YOUR CAREER</Text>
      <Text style={styles.subtitle}>Get personalized learning plan</Text>
      <Text style={styles.mainText}>How advanced are your tech skills?</Text>

      {/* Карточки ролей */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.cardContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          <LinearGradient
            colors={['#FFA726', '#FF7043']} // Оранжевый градиент для карточек
            style={styles.gradient}
          >
            <Text style={styles.cardText}>{option.label}</Text>
            <MaterialCommunityIcons
              name={option.icon || 'account-circle'} // Иконка из параметра или стандартная
              size={28}
              color="#FFFFFF" // Белые значки
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}

      {/* Кнопка Disconnect */}
      <TouchableOpacity
        style={styles.disconnectContainer}
        onPress={handleDisconnect}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#121212', // Темный фон
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
    color: '#AAAAAA',
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
    color: '#FFFFFF', // Белый текст
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

