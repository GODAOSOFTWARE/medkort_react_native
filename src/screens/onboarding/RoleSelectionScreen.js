// Импорт необходимых модулей
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Импорт градиента для кнопок

// Экран выбора роли
export default function RoleSelectionScreen({ route, navigation }) {
  // Получаем параметры, переданные при переходе на экран
  const { options } = route.params;

  // Обработчик выбора роли
  const handleRoleSelect = (roleKey) => {
    console.log(`RoleSelectionScreen: Выбрана роль - ${roleKey}`);
    if (roleKey === 'patient') {
      navigation.replace('PatinetProfile'); // Переход в кабинет пациента
    } else if (roleKey === 'admin') {
      // "Администратор" временно считается как "Врач"
      navigation.replace('AdminProfile'); // Переход в кабинет врача
    }
  };

  return (
    <View style={styles.container}>
      {/* Заголовок экрана */}
      <Text style={styles.title}>Вход в личный кабинет</Text>
      {/* Генерация кнопок на основе переданных опций */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.buttonContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          {/* Используем градиент для кнопки */}
          <LinearGradient
            colors={['#187bcd', '#4e9af1']} // Цвета градиента
            start={[0, 0]} // Начало градиента
            end={[1, 1]} // Конец градиента
            style={styles.button}
          >
            {/* Текст кнопки */}
            <Text style={styles.buttonText}>{option.label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Стили для компонентов
const styles = StyleSheet.create({
  // Стиль контейнера экрана
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  // Стиль заголовка
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  // Контейнер для кнопки (обрезка краев)
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden', // Обрезаем все элементы за пределами кнопки
  },
  // Основной стиль кнопки
  button: {
    width: '100%',
    paddingVertical: 15, // Высота кнопки
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Скругленные углы
  },
  // Стиль текста на кнопке
  buttonText: {
    fontSize: 18,
    color: '#fff', // Белый текст
    fontWeight: 'bold',
  },
});
