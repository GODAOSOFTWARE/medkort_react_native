import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockUsers from './mockUsers';

export default function AuthScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = mockUsers.find(
      (u) => u.login === login && u.password === password
    );

    if (user) {
      try {
        // Сохраняем токен и роль
        await AsyncStorage.setItem('authToken', user.token);
        await AsyncStorage.setItem('userRole', user.role);

        // Перенаправляем на соответствующий навигатор
        navigation.replace(user.role === 'patient' ? 'PatientNavigator' : 'OtherNavigator');
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось сохранить данные авторизации');
      }
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Авторизация</Text>
      <TextInput
        placeholder="Логин"
        value={login}
        onChangeText={setLogin}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
          padding: 10,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
          padding: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
}
