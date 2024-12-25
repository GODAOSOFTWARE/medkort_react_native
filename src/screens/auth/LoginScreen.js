import React, { useState } from 'react'; // Импортируем React и хук useState для управления состоянием.
import { View, StyleSheet } from 'react-native'; // Импортируем базовые компоненты React Native для создания контейнера и стилей.
import { TextInput, Button, Text, Avatar } from 'react-native-paper'; // Импортируем компоненты из react-native-paper для Material Design.

export default function LoginScreen() {
  // Хуки для управления состоянием логина и пароля.
  const [login, setLogin] = useState(''); // Стейт для хранения логина.
  const [password, setPassword] = useState(''); // Стейт для хранения пароля.

  // Функция, которая вызывается при нажатии на кнопку "Войти".
  const handleLogin = () => {
    console.log('Логин:', login); // Вывод логина в консоль (для отладки).
    console.log('Пароль:', password); // Вывод пароля в консоль (для отладки).
    alert('Форма авторизации готова'); // Всплывающее сообщение, подтверждающее работу формы.
  };

  return (
    // Основной контейнер для всего содержимого экрана.
    <View style={styles.container}>
      {/* Логотип, отображаемый с помощью Avatar.Icon из react-native-paper */}
      <Avatar.Icon size={100} icon="account-circle" style={styles.logo} />

      {/* Заголовок страницы авторизации */}
      <Text variant="headlineMedium" style={styles.title}>
        Вход в аккаунт
      </Text>

      {/* Поле для ввода логина */}
      <TextInput
        label="Логин" // Метка (Label) для поля.
        value={login} // Значение поля привязано к состоянию login.
        onChangeText={setLogin} // Обновление состояния login при вводе текста.
        mode="outlined" // Стиль поля в виде рамки (Material Design).
        style={styles.input} // Стили для поля.
      />

      {/* Поле для ввода пароля */}
      <TextInput
        label="Пароль" // Метка для поля.
        value={password} // Значение поля привязано к состоянию password.
        onChangeText={setPassword} // Обновление состояния password при вводе текста.
        secureTextEntry // Скрытие текста (звёздочки) для ввода пароля.
        mode="outlined" // Стиль поля в виде рамки (Material Design).
        style={styles.input} // Стили для поля.
      />

      {/* Кнопка входа */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Войти
      </Button>
    </View>
  );
}

// Стили для элементов экрана.
const styles = StyleSheet.create({
  container: {
    flex: 1, // Контейнер занимает весь экран.
    justifyContent: 'center', // Содержимое выравнивается по центру вертикально.
    alignItems: 'center', // Содержимое выравнивается по центру горизонтально.
    padding: 20, // Отступы внутри контейнера.
    backgroundColor: '#f5f5f5', // Светло-серый фон.
  },
  logo: {
    backgroundColor: '#6200ea', // Цвет фона иконки (основной акцентный цвет).
    marginBottom: 20, // Отступ снизу от логотипа.
  },
  title: {
    fontSize: 24, // Размер шрифта заголовка.
    fontWeight: 'bold', // Жирный шрифт для акцента.
    marginBottom: 20, // Отступ снизу от заголовка.
    color: '#333', // Тёмный текст.
  },
  input: {
    width: '100%', // Поле занимает всю ширину контейнера.
    marginBottom: 20, // Отступ между полями ввода.
  },
  button: {
    marginTop: 10, // Отступ сверху от последнего поля ввода.
    width: '100%', // Кнопка занимает всю ширину контейнера.
    padding: 10, // Внутренние отступы кнопки.
  },
});
