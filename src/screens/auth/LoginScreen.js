import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';
import AuthService from '../../services/authService';
import StorageService from '../../services/storageService';

const { width, height } = Dimensions.get('window'); // Получаем текущие размеры экрана

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sizeCategory = getSizeCategory(); // Определяем текущую категорию экрана
  const deviceBrand = Platform.OS === 'ios' ? 'iPhone' : 'Android'; // Определяем платформу
  const sizeSymbol = {
    small: 'S',
    medium: 'M',
    large: 'L',
  }[sizeCategory]; // Символ в зависимости от категории экрана

  useEffect(() => {
    const libraryName = 'Platform'; // Название библиотеки, которая определила устройство

    // Логи при загрузке экрана
    console.log(`Определено устройство: ${deviceBrand}`);
    console.log(`Библиотека определения устройства: ${libraryName}`);
    console.log(`Размер экрана: ширина - ${width}px, высота - ${height}px`);
    console.log(`Определена категория экрана: ${sizeCategory}_Screen`);
    console.log(`Определен символ: ${sizeSymbol}`);
    console.log(`Стили отрисованы в соответствии с категорией: ${sizeSymbol}`);
}, []);


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
    <View style={styles(sizeCategory).container}>
      <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles(sizeCategory).header}>
        <Text style={styles(sizeCategory).headerTitle}>Медкорт</Text>
        <Text style={styles(sizeCategory).headerSubtitle}>Врач всегда рядом</Text>
        <View style={styles(sizeCategory).iconRow}>
          <TouchableOpacity style={styles(sizeCategory).socialButton}>
            <MaterialCommunityIcons name="facebook" size={responsiveSizes.icon[sizeCategory]} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles(sizeCategory).socialButton}>
            <MaterialCommunityIcons name="apple" size={responsiveSizes.icon[sizeCategory]} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles(sizeCategory).socialButton}>
            <MaterialCommunityIcons name="google" size={responsiveSizes.icon[sizeCategory]} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles(sizeCategory).form}>
        <Text style={styles(sizeCategory).formTitle}>Войдите, чтобы начать</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles(sizeCategory).input}
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#1E3C72' } }}
        />
        <TextInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles(sizeCategory).input}
          secureTextEntry
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#1E3C72' } }}
        />
        <View style={styles(sizeCategory).checkboxRow}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="#1E3C72"
          />
          <Text style={styles(sizeCategory).checkboxText}>Запомнить меня</Text>
        </View>
        <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={['#1E3C72', '#2A5298']}
            style={styles(sizeCategory).signInButton}
          >
            <Text style={styles(sizeCategory).signInButtonText}>Войти</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (sizeCategory) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9fbfc',
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: responsiveSizes.padding[sizeCategory],
    },
    headerTitle: {
      fontSize: responsiveSizes.text[sizeCategory],
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: responsiveSizes.margin[sizeCategory],
    },
    headerSubtitle: {
      fontSize: responsiveSizes.text[sizeCategory],
      color: '#fff',
      marginBottom: responsiveSizes.margin[sizeCategory],
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: responsiveSizes.margin[sizeCategory],
      marginTop: responsiveSizes.margin[sizeCategory],
    },
    socialButton: {
      backgroundColor: '#fff',
      padding: responsiveSizes.padding[sizeCategory],
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
      marginHorizontal: responsiveSizes.margin[sizeCategory],
    },
    form: {
      flex: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: responsiveSizes.margin[sizeCategory],
      borderTopRightRadius: responsiveSizes.margin[sizeCategory],
      paddingHorizontal: responsiveSizes.padding[sizeCategory],
      paddingVertical: responsiveSizes.padding[sizeCategory],
      marginTop: -responsiveSizes.margin[sizeCategory],
    },
    formTitle: {
      fontSize: responsiveSizes.text[sizeCategory],
      color: '#333',
      marginBottom: responsiveSizes.margin[sizeCategory],
    },
    input: {
      marginBottom: responsiveSizes.margin[sizeCategory],
      backgroundColor: '#fff',
      borderRadius: responsiveSizes.margin[sizeCategory],
      paddingHorizontal: responsiveSizes.padding[sizeCategory],
      fontSize: responsiveSizes.input.fontSize,
      height: responsiveSizes.input.height,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsiveSizes.margin[sizeCategory],
    },
    checkboxText: {
      marginLeft: responsiveSizes.margin[sizeCategory],
      color: '#333',
    },
    signInButton: {
      height: responsiveSizes.button.extraLarge,
      borderRadius: responsiveSizes.margin[sizeCategory],
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsiveSizes.margin[sizeCategory],
      width: '100%',
      alignSelf: 'center',
    },
    signInButtonText: {
      color: '#fff',
      fontSize: responsiveSizes.text[sizeCategory],
      fontWeight: 'bold',
    },
  });
