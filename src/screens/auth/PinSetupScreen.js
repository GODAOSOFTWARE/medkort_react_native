import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function PinSetupScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const handlePress = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);

      console.log('Введенный PIN:', newPin); // Логируем PIN

      if (newPin.length === 4) {
        console.log('Переход на экран подтверждения с PIN:', newPin); // Логируем переход
        navigation.navigate('PinConfirm', { pin: newPin });
      }
    }
  };

  const handleDelete = () => {
    const updatedPin = pin.slice(0, -1);
    setPin(updatedPin);
    console.log('Удаление символа, текущий PIN:', updatedPin); // Логируем удаление
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Установите PIN-код
      </Text>

      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              pin.length > index && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>

      {/* Классическая клавиатура */}
      <View style={styles.keyboard}>
        {[
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          ['❌', 0, '←'],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, keyIndex) => (
              <TouchableRipple
                key={keyIndex}
                onPress={() =>
                  key === '❌'
                    ? pin.length > 0 && handleDelete()
                    : key === '←'
                    ? handleBack()
                    : handlePress(key)
                }
                disabled={key === '❌' && pin.length === 0}
                style={[
                  styles.key,
                  key === '❌' && styles.deleteKey, // Желтая кнопка удаления
                  key === '←' && styles.backKey, // Красная кнопка назад
                ]}
              >
                <Text
                  style={[
                    styles.keyText,
                    key === '❌' && styles.deleteKeyText,
                    key === '←' && styles.backKeyText,
                  ]}
                >
                  {key}
                </Text>
              </TouchableRipple>
            ))}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    margin: 8,
  },
  pinDotFilled: {
    backgroundColor: '#FFFFFF',
  },
  keyboard: {
    width: '100%',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  key: {
    backgroundColor: '#FFFFFF',
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  deleteKey: {
    backgroundColor: '#FFD700', // Желтый цвет для кнопки удаления
  },
  deleteKeyText: {
    color: '#000000', // Черный текст для желтой кнопки
  },
  backKey: {
    backgroundColor: '#FF6347', // Красный цвет для кнопки назад
  },
  backKeyText: {
    color: '#FFFFFF', // Белый текст для красной кнопки
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});

