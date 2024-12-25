import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PinConfirmScreen({ route, navigation }) {
  const { pin: originalPin } = route.params; // Получаем PIN-код из предыдущего экрана
  const [confirmPin, setConfirmPin] = useState('');

  const handlePress = (digit) => {
    if (confirmPin.length < 4) {
      const newPin = confirmPin + digit;
      setConfirmPin(newPin);

      if (newPin.length === 4) {
        if (newPin === originalPin) {
          // PIN-коды совпадают
          savePin(newPin);
        } else {
          // PIN-коды не совпадают
          Alert.alert('Ошибка', 'PIN-коды не совпадают. Попробуйте снова.');
          setConfirmPin(''); // Сброс ввода
        }
      }
    }
  };

  const handleDelete = () => {
    setConfirmPin(confirmPin.slice(0, -1)); // Удаление последней цифры
  };

  const savePin = async (pin) => {
    try {
      await AsyncStorage.setItem('userPin', pin); // Сохранение PIN-кода
      Alert.alert('Успех', `PIN-код "${pin}" сохранён.`, [
        { text: 'OK', onPress: () => navigation.navigate('Login') }, // Возвращаемся на экран логина
      ]);
    } catch (error) {
      console.error('Ошибка сохранения PIN-кода:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить PIN-код.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтвердите PIN-код</Text>
      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              confirmPin.length > index && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>
      <View style={styles.keyboard}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => (key === '←' ? handleDelete() : handlePress(key))}
            disabled={key === ''}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    margin: 5,
  },
  pinDotFilled: {
    backgroundColor: '#333',
  },
  keyboard: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
