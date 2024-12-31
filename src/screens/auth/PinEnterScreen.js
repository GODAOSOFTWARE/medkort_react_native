import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import StorageService from '../../services/storageService';

export default function PinEnterScreen({ navigation }) {
  const [enteredPin, setEnteredPin] = useState('');

  const handlePress = async (digit) => {
    if (enteredPin.length < 4) {
      const newPin = enteredPin + digit;
      setEnteredPin(newPin);

      if (newPin.length === 4) {
        // Когда набралось 4 символа, проверяем с тем, что лежит в локальном хранилище
        try {
          const savedPin = await StorageService.getItem('userPin');
          if (newPin === savedPin) {
            console.log('PIN верен:', newPin);

            // Далее получаем роль
            const userRole = await StorageService.getItem('userRole');
            console.log(`Роль пользователя: ${userRole}`);

            // Если роль не найдена, возможно выбросить ошибку или перенаправить на роль
            if (!userRole) {
              Alert.alert('Ошибка', 'Роль не найдена в хранилище.');
              return;
            }

            // Если роль найдена, переходим дальше
            if (userRole === 'PATIENT') {
              navigation.navigate('PatientProfileScreen');
            } else {
              navigation.navigate('RoleSelectionScreen');
            }
          } else {
            console.log('Введён неверный PIN:', newPin);
            Alert.alert('Ошибка', 'Неверный пин. Повторите ввод.');
            setEnteredPin('');
          }
        } catch (error) {
          console.error('Ошибка при проверке пина:', error);
          Alert.alert('Ошибка', 'Произошла ошибка при проверке пина.');
          setEnteredPin('');
        }
      }
    }
  };

  const handleDelete = () => {
    // Удаляем последний символ
    const updatedPin = enteredPin.slice(0, -1);
    setEnteredPin(updatedPin);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Введите PIN-код
      </Text>

      <View style={styles.pinContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              enteredPin.length > index && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>

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
                    ? enteredPin.length > 0 && handleDelete()
                    : key === '←'
                    ? handleBack()
                    : handlePress(key)
                }
                style={[
                  styles.key,
                  key === '❌' && styles.deleteKey,
                  key === '←' && styles.backKey,
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
    backgroundColor: '#FFD700',
  },
  deleteKeyText: {
    color: '#000000',
  },
  backKey: {
    backgroundColor: '#FF6347',
  },
  backKeyText: {
    color: '#FFFFFF',
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});
