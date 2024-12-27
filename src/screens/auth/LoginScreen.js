import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper'; // Используем paper-компоненты
import AuthService from '../../services/authService'; // Импорт AuthService
import StorageService from '../../services/storageService'; // Импорт StorageService
import styles from './login/styles'; // Импорт стилей

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Проверка на заполненность полей
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Поле "Email" не может быть пустым.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный "Email".');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Поле "Пароль" не может быть пустым.');
      return;
    }

    try {
      setIsLoading(true); // Включаем индикатор загрузки

      // Вызов метода авторизации
      const token = await AuthService.login(email.trim(), password.trim());

      // Сохранение токена
      await StorageService.setItem('authToken', token);

      // Переход к следующему экрану (установка PIN-кода)
      Alert.alert(
        'Успешно',
        'Вы успешно авторизовались.',
        [
          {
            text: 'ОК',
            onPress: () => navigation.navigate('PinSetup'),
          },
        ]
      );
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      Alert.alert('Ошибка', 'Неверный логин или пароль.');
    } finally {
      setIsLoading(false); // Останавливаем индикатор загрузки
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon="account-circle" style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>
        Вход в аккаунт
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input} // Применяем стили
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input} // Применяем стили
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        mode="contained"
        onPress={handleLogin} // Добавляем обработчик авторизации
        style={styles.button} // Применяем стили
        loading={isLoading}
        disabled={isLoading}
      >
        Войти
      </Button>
    </View>
  );
}
