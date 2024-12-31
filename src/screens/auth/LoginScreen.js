import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../../services/authService';
import StorageService from '../../services/storageService';

const { width } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      setIsLoading(true);
      const token = await AuthService.login(email.trim(), password.trim());
      await StorageService.setItem('authToken', token);
      if (rememberMe) {
        await StorageService.setItem('rememberMe', true);
      }
      navigation.navigate('PinSetupScreen');
    } catch (error) {
      alert('Неверный email или пароль.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Личный кабинет</Text>
        <Text style={styles.subtitle}>
          Введите ваш email и пароль чтобы войти
        </Text>

        {/* Поле Email с плавающей меткой */}
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          outlineColor="#E0E0E0"          // Цвет обводки (не в фокусе)
          activeOutlineColor="#FFFFFF"     // Цвет обводки (в фокусе)
          textColor="#E0E0E0"              // Цвет вводимого текста
          placeholderTextColor="#FFFFFF"   // Цвет плейсхолдера (когда поле пустое)
          theme={{
            colors: {
              placeholder: '#E0E0E0',      // Цвет лейбла, когда поле пустое
              onSurfaceVariant: '#E0E0E0', // Цвет лейбла при фокусе
              background: 'transparent',   // Чтобы не было серого фона внутри
            },
            roundness: 8,                  // Скруглённые углы
          }}
        />

        {/* Поле Password с плавающей меткой */}
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#FFFFFF"
          textColor="#E0E0E0"
          placeholderTextColor="#FFFFFF"
          theme={{
            colors: {
              placeholder: '#FFFFFF',
              onSurfaceVariant: '#FFFFFF',
              background: 'transparent',
            },
            roundness: 8,
          }}
        />

        {/* Switch: Запомнить меня */}
        <View style={styles.switchContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            color="#6C63FF"               // Цвет переключателя, когда он включён
          />
          <Text style={styles.switchLabel}>Запомнить меня</Text>
        </View>

        {/* Кнопка Войти */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.signInButton}
        >
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Увеличиваем высоту полей примерно на 20%
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'transparent',
    height: 58, // примерно на 20% больше стандартных ~48 пикселей
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  switchLabel: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
  },
  // Увеличиваем кнопку в 2 раза: удваиваем paddingVertical
  signInButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 28, // вместо 14
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#E0E0E0',
    textAlign: 'center',
    fontSize: 16,
  },
  signUpText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});
