import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageService from '../../services/storageService'; // Импорт StorageService

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params;

  const handleRoleSelect = (roleKey) => {
    console.log(`Выбрано: ${roleKey}`);
    navigation.navigate('RoleBasedScreen', { roleKey });
  };

  const handleDisconnect = async () => {
    try {
      console.log('Отключение и сброс навигации...');
      await StorageService.removeItem('authToken');
      await StorageService.removeItem('pinCode');
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      console.error('Ошибка при отключении:', error);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Text style={styles.title}>ВЫБЕРИТЕ РОЛЬ</Text>
      <Text style={styles.subtitle}>Используйте возможности Медкорт</Text>

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
              color={
                option.key === 'PATIENT'
                  ? '#34A853'
                  : option.key === 'ADMIN'
                  ? '#FBBC05'
                  : '#4285F4'
              }
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.disconnectContainer} onPress={handleDisconnect}>
        <Text style={[styles.cardText, { color: '#FFFFFF' }]}>Назад</Text>
        <MaterialCommunityIcons
          name="logout"
          size={28}
          color="#FFFFFF"
          style={styles.icon}
        />
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing I agree with{' '}
        <Text style={styles.link}>Terms & conditions</Text>,{' '}
        <Text style={styles.link}>Privacy policy</Text>,{' '}
        <Text style={styles.link}>Cookie policy</Text>
      </Text>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#D32F2F',
  },
  footer: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FFA726',
    fontWeight: 'bold',
  },
});
