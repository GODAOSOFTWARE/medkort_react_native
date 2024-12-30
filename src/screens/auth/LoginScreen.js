import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';
import AuthService from '../../services/authService';
import StorageService from '../../services/storageService';

const { width, height } = Dimensions.get('window');

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const sizeCategory = getSizeCategory();

  const showAlert = (title, message, image) => {
    console.log('showAlert вызван с параметрами:', { title, message, image });
    setAlertConfig({ title, message, image });
    setAlertVisible(true);
    console.log('alertVisible (after showAlert):', alertVisible);
  };

  const hideAlert = () => {
    console.log('hideAlert вызван');
    setAlertVisible(false);
    console.log('alertVisible (after hideAlert):', alertVisible);
  };

  const handleLogin = async () => {
    console.log('handleLogin вызван с email:', email, 'и password:', password);
    if (!email.trim()) {
      showAlert(
        'Ошибка',
        'Поле "Email" не может быть пустым.',
        'https://via.placeholder.com/150'
      );
      return;
    }

    if (!email.includes('@')) {
      showAlert(
        'Ошибка',
        'Введите корректный "Email".',
        'https://via.placeholder.com/150'
      );
      return;
    }

    if (!password.trim()) {
      showAlert(
        'Ошибка',
        'Поле "Пароль" не может быть пустым.',
        'https://via.placeholder.com/150'
      );
      return;
    }

    try {
      setIsLoading(true);
      const token = await AuthService.login(email.trim(), password.trim());
      await StorageService.setItem('authToken', token);
      showAlert(
        'Успешно',
        'Вы успешно авторизовались!',
        'https://via.placeholder.com/150'
      );
      setTimeout(() => {
        hideAlert();
        navigation.navigate('PinSetupScreen');
      }, 2000);
    } catch (error) {
      showAlert(
        'Ошибка',
        'Неверный логин или пароль.',
        'https://via.placeholder.com/150'
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log('alertVisible проверяется в return:', alertVisible);

  return (
    <View style={styles.container}>
      {alertVisible && (
        <View style={styles.alertContainer}>
          <Image
            source={{ uri: alertConfig.image }}
            style={styles.alertImage}
            resizeMode="cover"
          />
          <Text style={styles.alertTitle}>{alertConfig.title}</Text>
          <Text style={styles.alertMessage}>{alertConfig.message}</Text>
          <TouchableOpacity
            style={[styles.alertButton, { width: '100%' }]} // Кнопка по ширине картинки
            onPress={hideAlert}
          >
            <Text style={styles.alertButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      )}

      <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.header}>
        <Text style={styles.headerTitle}>Медкорт</Text>
        <Text style={styles.headerSubtitle}>Врач всегда рядом</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="apple" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="google" size={30} color="#DB4437" />
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
          theme={{ colors: { primary: '#1E3C72' } }}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
            theme={{ colors: { primary: '#1E3C72' } }}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#1E3C72"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.signInButton}
        >
          <Text style={styles.signInButtonText}>Войти</Text>
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
    backgroundColor: '#1E3C72',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 2,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 60, // Увеличена высота поля ввода
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 230,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#fff',
    height: 60, // Увеличена высота поля ввода
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
  },
  signInButton: {
    backgroundColor: '#1E3C72',
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5, // Увеличена высота алерта
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    zIndex: 10,
  },
  alertImage: {
    width: '100%',
    height: '40%',
    borderRadius: 10,
    marginBottom: 15,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: '#1E3C72',
    paddingVertical: 35,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  alertButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});