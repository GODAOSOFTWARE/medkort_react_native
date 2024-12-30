import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService';

export default function RoleSelectionScreen({ navigation }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const userRole = await StorageService.getItem('userRole'); // Получаем роль из хранилища
        console.log(`Роль пользователя из хранилища: ${userRole}`);

        const roleOptions = [
          { key: 'PATIENT', label: 'Пациент', icon: 'account' },
          {
            key: userRole,
            label:
              userRole === 'DOCTOR_ROLE'
                ? 'Доктор'
                : userRole === 'ADMIN_ROLE'
                ? 'Администратор'
                : 'Другая роль',
            icon: userRole === 'DOCTOR_ROLE' ? 'stethoscope' : 'shield-account',
          },
        ];

        setOptions(roleOptions);
      } catch (error) {
        console.error('Ошибка при загрузке роли из хранилища:', error);
        Alert.alert('Ошибка', 'Не удалось загрузить роли. Попробуйте снова.');
        navigation.navigate('WelcomeScreen');
      }
    };

    loadRoles();
  }, [navigation]);

  const handleRoleSelect = (roleKey) => {
    console.log(`Выбрана роль: ${roleKey}`);
    navigation.navigate('RoleBasedScreen', { roleKey });
  };

  const handleDisconnect = async () => {
    try {
      await StorageService.removeItem('authToken');
      await StorageService.removeItem('userPin');
      await StorageService.removeItem('userRole');
      console.log('Все данные очищены. Переход на WelcomeScreen.');
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Ошибка при очистке данных:', error);
      Alert.alert('Ошибка', 'Не удалось выйти.');
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text style={styles.title}>Выберите роль</Text>
      <Text style={styles.subtitle}>Используйте возможности Medkort</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.cardContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
            style={styles.gradient}
          >
            <Text style={styles.cardText}>{option.label}</Text>
            <MaterialCommunityIcons
              name={option.icon || 'account-circle'}
              size={28}
              color="#4285F4"
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.disconnectContainer} onPress={handleDisconnect}>
        <Text style={[styles.cardText, { color: '#FFFFFF' }]}>Выйти</Text>
        <MaterialCommunityIcons name="logout" size={28} color="#FFFFFF" style={styles.icon} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  icon: {
    marginLeft: 10,
  },
  disconnectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#D32F2F',
    borderRadius: 10,
  },
});
