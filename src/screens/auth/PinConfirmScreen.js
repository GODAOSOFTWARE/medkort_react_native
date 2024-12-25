import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Alert } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PinConfirmScreen({ route, navigation }) {
  const { pin: originalPin } = route.params;
  const [confirmPin, setConfirmPin] = useState('');

  const handlePress = (digit) => {
    if (confirmPin.length < 4) {
      const newPin = confirmPin + digit;
      setConfirmPin(newPin);

      if (newPin.length === 4) {
        if (newPin === originalPin) {
          savePin(newPin);
        } else {
          Alert.alert('Ошибка', 'PIN-коды не совпадают. Попробуйте снова.');
          setConfirmPin('');
        }
      }
    }
  };

  const handleDelete = () => {
    setConfirmPin(confirmPin.slice(0, -1));
  };

  const savePin = async (pin) => {
    try {
      await AsyncStorage.setItem('userPin', pin);
      Alert.alert('Успех', `PIN-код "${pin}" сохранён.`);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Ошибка сохранения PIN-кода:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить PIN-код.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Подтвердите PIN-код
      </Text>

      {/* PIN-код индикаторы */}
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

      {/* Клавиатура */}
      <View style={styles.keyboard}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((key) => (
          <Button
            key={key}
            mode="outlined"
            style={styles.key}
            onPress={() => (key === '←' ? handleDelete() : handlePress(key))}
            disabled={key === ''}
          >
            {key}
          </Button>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
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
    margin: 5,
    width: '25%',
  },
});
