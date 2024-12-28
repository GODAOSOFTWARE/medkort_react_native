import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import StorageService from '../../services/storageService'; // Используем StorageService для работы с хранилищем

export default function PinConfirmScreen({ route, navigation }) {
  const [confirmPin, setConfirmPin] = useState('');
  const { pin } = route.params;

  const handlePress = async (digit) => {
    if (confirmPin.length < 4) {
      const newPin = confirmPin + digit;
      setConfirmPin(newPin);

      console.log('Ввод подтверждения PIN:', newPin); // Логируем ввод

      if (newPin.length === 4) {
        if (newPin === pin) {
          console.log('PIN успешно подтвержден:', newPin); // Успешное подтверждение
          try {
            // Сохраняем PIN в хранилище
            await StorageService.setItem('userPin', newPin);

            // Получаем токен и роль пользователя
            const authToken = await StorageService.getItem('authToken');
            const userRole = await StorageService.getItem('userRole'); // Предполагается, что роль уже сохранена

            console.log(`authToken: ${authToken}, userRole: ${userRole}`);

            // Переход в зависимости от роли пользователя
            if (userRole === '0') {
              // Если роль "пациент" (0), перенаправляем на дашборд пациента
              navigation.navigate('PatientProfileScreen');
            } else {
              // Если роль не "пациент", перенаправляем на экран выбора роли
              navigation.navigate('RoleSelectionScreen');
            }
          } catch (error) {
            console.error('Ошибка обработки PIN-кода:', error);
            Alert.alert('Ошибка', 'Не удалось обработать PIN-код.');
          }
        } else {
          console.log('PIN не совпадает:', newPin); // Ошибка подтверждения
          Alert.alert('Ошибка', 'PIN-коды не совпадают. Повторите ввод.');
          setConfirmPin(''); // Сбрасываем введенный PIN
        }
      }
    }
  };

  const handleDelete = () => {
    const updatedPin = confirmPin.slice(0, -1);
    setConfirmPin(updatedPin);
    console.log('Удаление символа подтверждения PIN:', updatedPin); // Логируем удаление
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Подтвердите PIN-код
      </Text>

      {/* Индикатор для PIN */}
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

      {/* Клавиатура для ввода PIN */}
      <View style={styles.keyboard}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '←'].map((key, index) => (
          <Button
            key={index}
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
    fontWeight: 'bold',
    color: '#000000',
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3D54DA',
    margin: 5,
  },
  pinDotFilled: {
    backgroundColor: '#6200ea',
  },
  keyboard: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    margin: 5,
    width: '25%',
  },
});
