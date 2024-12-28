import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import StorageService from '../../services/storageService'; // Импорт StorageService
import UserService from '../../services/userService'; // Импорт UserService

export default function PinConfirmScreen({ route, navigation }) {
  const [confirmPin, setConfirmPin] = useState('');
  const { pin } = route.params;

  const handlePress = async (digit) => {
    if (confirmPin.length < 4) {
      const newPin = confirmPin + digit;
      setConfirmPin(newPin);

      console.log('Ввод подтверждения PIN:', newPin);

      if (newPin.length === 4) {
        if (newPin === pin) {
          console.log('PIN успешно подтвержден:', newPin);
          try {
            // Сохраняем PIN-код в хранилище
            await StorageService.setItem('pinCode', newPin);

            // Получаем токен
            const authToken = await StorageService.getItem('authToken');
            console.log(`authToken: ${authToken}`);

            // Получаем данные пользователя через UserService
            const userData = await UserService.getUser(authToken);
            const userRole = userData?.data?.role?.value;

            console.log(`Полученная роль пользователя: ${userRole}`);

            if (!userRole) {
              throw new Error('Роль пользователя не определена.');
            }

            // Сохраняем роль в хранилище
            await StorageService.setItem('userRole', userRole);

            // Выводим алерт с текущими данными из хранилища
            const savedPin = await StorageService.getItem('pinCode');
            const savedRole = await StorageService.getItem('userRole');

            Alert.alert(
              'Данные сохранены',
              `Токен: ${authToken}\nPIN: ${savedPin}\nРоль: ${savedRole}`,
              [{ text: 'OK', onPress: () => handleNavigation(userRole, userData) }]
            );
          } catch (error) {
            console.error('Ошибка при обработке PIN-кода или запроса API:', error);
            Alert.alert('Ошибка', 'Не удалось обработать PIN-код или запрос данных.');
          }
        } else {
          console.log('PIN не совпадает:', newPin);
          Alert.alert('Ошибка', 'PIN-коды не совпадают. Повторите ввод.');
          setConfirmPin('');
        }
      }
    }
  };

  const handleNavigation = (userRole, userData) => {
    if (userRole === 'PATIENT') {
      navigation.navigate('PatientProfileScreen');
    } else {
      const options = [
        { key: 'PATIENT', label: 'Пациент', icon: 'account' },
        { key: userRole, label: userData.data.role.name, icon: 'shield-account' },
      ];
      navigation.navigate('RoleSelectionScreen', { options });
    }
  };

  const handleDelete = () => {
    const updatedPin = confirmPin.slice(0, -1);
    setConfirmPin(updatedPin);
    console.log('Удаление символа подтверждения PIN:', updatedPin);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Подтвердите PIN-код
      </Text>

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
