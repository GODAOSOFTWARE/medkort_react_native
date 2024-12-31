import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import StorageService from '../../services/storageService';
import UserService from '../../services/userService';

export default function PinConfirmScreen({ route, navigation }) {
  const [confirmPin, setConfirmPin] = useState('');
  const { pin } = route.params;

  const handlePress = async (digit) => {
    if (confirmPin.length < 4) {
      const newPin = confirmPin + digit;
      setConfirmPin(newPin);

      if (newPin.length === 4) {
        if (newPin === pin) {
          console.log('PIN успешно подтвержден:', newPin);

          try {
            // Сохраняем PIN-код
            await StorageService.setItem('userPin', newPin);

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

            Alert.alert(
              'Данные сохранены',
              `PIN-код сохранен.\nРоль: ${userRole}`,
              [{ text: 'OK', onPress: () => handleNavigation(userRole) }]
            );
          } catch (error) {
            console.error('Ошибка при обработке PIN-кода или запроса API:', error);
            Alert.alert('Ошибка', 'Не удалось сохранить PIN-код или получить данные пользователя.');
          }
        } else {
          console.log('PIN не совпадает:', newPin);
          Alert.alert('Ошибка', 'PIN-коды не совпадают. Повторите ввод.');
          setConfirmPin('');
        }
      }
    }
  };

  const handleNavigation = (userRole) => {
    if (userRole === 'PATIENT') {
      navigation.navigate('PatientProfileScreen');
    } else {
      navigation.navigate('RoleSelectionScreen');
    }
  };

  const handleDelete = () => {
    const updatedPin = confirmPin.slice(0, -1);
    setConfirmPin(updatedPin);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
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
                    ? confirmPin.length > 0 && handleDelete()
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
