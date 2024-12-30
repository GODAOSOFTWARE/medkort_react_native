import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
      alert('Please fill in all fields.');
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
      alert('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Авторизация</Text>
        <Text style={styles.subtitle}>Введите данные для входа в кабинет</Text>

        <TextInput
          label="Адрес электронной почты"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF', placeholder: '#FFFFFF' } }}
        />

        <TextInput
          label="Пароль от личного кабинета"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF', placeholder: '#FFFFFF' } }}
        />

        <View style={styles.switchContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            color="#6C63FF"
          />
          <Text style={styles.switchLabel}>Remember me</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.signInButton}
        >
          <Text style={styles.signInButtonText}>ВОЙТИ</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
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
  input: {
    height: 70, // добавлена возможность настройки высоты
    borderRadius: 20,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  switchLabel: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 30,
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
  },
  signUpText: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});