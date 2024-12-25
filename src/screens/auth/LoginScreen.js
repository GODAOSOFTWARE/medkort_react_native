import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import AuthService from '../../services/authService'; // Импорт AuthService
import StorageService from '../../services/storageService'; // Импорт StorageService

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); // Состояние для email
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки
  const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля

  const handleLogin = async () => {
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

    try {
      setIsLoading(true); // Включаем индикатор загрузки

      // Вызов метода авторизации из AuthService
      const token = await AuthService.login(email.trim(), password.trim());

      // Сохранение токена в локальное хранилище через StorageService
      await StorageService.setItem('authToken', token);

      // Уведомляем об успешной авторизации
      Alert.alert(
        'Добро пожаловать в альфа тест',
        `Вы успешно авторизовались.`,
        [
          {
            text: 'ОК',
            onPress: () => navigation.navigate('PinSetup'), // Переход на экран установки PIN
          },
        ]
      );
    } catch (error) {
      console.error('Ошибка авторизации:', error); // Логируем ошибки
      Alert.alert('Ошибка', 'Неверный логин или пароль.');
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
