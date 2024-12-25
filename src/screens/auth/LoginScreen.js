import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState(''); // Состояние для email
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки
  const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля

  const handleLogin = async () => {
    const url = 'https://medkort.ru/api/login'; // URL для запроса

    // Проверка полей
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Поле "Email" не может быть пустым.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Формат "Email" должен содержать символ "@" и быть корректным.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Поле "Пароль" не может быть пустым.');
      return;
    }

    const requestBody = {
      email: email.trim(),
      password: password.trim(),
    };

    console.log('Отправляем запрос:', JSON.stringify(requestBody)); // Логируем данные

    try {
      setIsLoading(true); // Включаем индикатор загрузки

      // Отправка POST-запроса
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Получаем ответ
      const responseData = await response.json();
      console.log('Ответ от сервера:', responseData); // Логируем ответ

      if (response.ok) {
        const { access_token } = responseData; // Извлекаем токен из ответа

        // Сохраняем токен в AsyncStorage
        await AsyncStorage.setItem('authToken', access_token);

        // Логируем, что токен успешно записан
        console.log(`Токен "${access_token}" записан в локальное хранилище.`);

        // Уведомляем об успешной авторизации
        Alert.alert('Добро пожаловать в альфа тест', `Токен "${access_token}" записан в локальное хранилище.`);
      } else {
        // Если ошибка авторизации
        Alert.alert('Ошибка', 'Неверный логин или пароль.');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error); // Логируем ошибки
      Alert.alert('Ошибка', 'Произошла ошибка при отправке запроса.');
    } finally {
      setIsLoading(false); // Выключаем индикатор загрузки
    }
  };

  return (
    <View style={styles.container}>
      {/* Логотип */}
      <Avatar.Icon size={100} icon="account-circle" style={styles.logo} />

      {/* Заголовок */}
      <Text variant="headlineMedium" style={styles.title}>
        Вход в аккаунт
      </Text>

      {/* Поле для ввода email */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Поле для ввода пароля */}
      <TextInput
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword} // Скрываем или показываем пароль
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'} // Иконка глаза
            onPress={() => setShowPassword(!showPassword)} // Переключение отображения пароля
          />
        }
      />

      {/* Кнопка "Войти" */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
      >
        Войти
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    backgroundColor: '#6200ea',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
});
