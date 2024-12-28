import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import responsiveSizes from '../../styles/styles.responsive';
import AuthService from '../../services/authService';
import StorageService from '../../services/storageService';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
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
      setIsLoading(true);
      const token = await AuthService.login(email.trim(), password.trim());
      await StorageService.setItem('authToken', token);
      Alert.alert('Успешно', 'Вы успешно авторизовались.', [
        { text: 'ОК', onPress: () => navigation.navigate('PinSetup') },
      ]);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      Alert.alert('Ошибка', 'Неверный логин или пароль.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.header}>
        <Text style={styles.headerTitle}>Медкорт</Text>
        <Text style={styles.headerSubtitle}>Врач всегда рядом</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={responsiveSizes.icon.medium} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="apple" size={responsiveSizes.icon.medium} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="google" size={responsiveSizes.icon.medium} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Войдите, чтобы начать</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#1E3C72' } }}
        />
        <TextInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#1E3C72' } }}
        />
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="#1E3C72"
          />
          <Text style={styles.checkboxText}>Запомнить меня</Text>
        </View>
        <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={['#1E3C72', '#2A5298']}
            style={styles.signInButton}
          >
            <Text style={styles.signInButtonText}>Войти</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfc',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveSizes.padding.large,
  },
  headerTitle: {
    fontSize: responsiveSizes.text.large,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: responsiveSizes.margin.medium,
  },
  headerSubtitle: {
    fontSize: responsiveSizes.text.medium,
    color: '#fff',
    marginBottom: responsiveSizes.margin.large,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSizes.margin.large,
    marginTop: responsiveSizes.margin.medium,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: responsiveSizes.padding.medium,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginHorizontal: responsiveSizes.margin.medium,
  },
  form: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveSizes.padding.large,
    borderTopRightRadius: responsiveSizes.padding.large,
    paddingHorizontal: responsiveSizes.padding.medium,
    paddingVertical: responsiveSizes.padding.large,
    marginTop: -responsiveSizes.margin.large,
  },
  formTitle: {
    fontSize: responsiveSizes.text.medium,
    color: '#333',
    marginBottom: responsiveSizes.margin.large,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: responsiveSizes.margin.medium,
    backgroundColor: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSizes.margin.medium,
  },
  checkboxText: {
    marginLeft: responsiveSizes.margin.small,
    color: '#333',
  },
  signInButton: {
    paddingVertical: responsiveSizes.padding.large,
    borderRadius: responsiveSizes.margin.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveSizes.margin.medium,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: responsiveSizes.text.medium,
    fontWeight: 'bold',
  },
});