import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Градиент для кнопок
import StorageService from '../../services/storageService'; // Импорт StorageService

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params;

  // Обработчик выбора роли
  const handleRoleSelect = (roleKey) => {
    if (roleKey === 'patient') {
      navigation.replace('PatientProfile');
    } else if (roleKey === 'admin') {
      navigation.replace('AdminProfile');
    }
  };

  // Сброс токена, пин-кода и переход на WelcomeScreen
  const handleReset = async () => {
    try {
      await StorageService.removeItem('authToken'); // Удаляем токен
      await StorageService.removeItem('pinCode'); // Удаляем пин-код
      console.log('Токен и пин-код успешно сброшены');
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }], // Переадресация на WelcomeScreen
      });
    } catch (error) {
      console.error('Ошибка при сбросе токена и пин-кода:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите роль</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.buttonContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          <LinearGradient
            colors={['#187bcd', '#4e9af1']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{option.label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      {/* Кнопка сброса токена и пин-кода */}
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Сбросить токен и пин-код</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff5c5c',
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
