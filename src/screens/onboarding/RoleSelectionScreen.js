import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Для иконок
import StorageService from '../../services/storageService';

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = (roleKey) => {
    if (roleKey === 'patient') {
      navigation.replace('PatientProfile');
    } else if (roleKey === 'admin') {
      navigation.replace('AdminProfile');
    }
  };

  const handleReset = async () => {
    try {
      await StorageService.removeItem('authToken');
      await StorageService.removeItem('pinCode');
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      console.error('Ошибка сброса токена:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите роль</Text>
      <Text style={styles.subtitle}>Подберите подходящий интерфейс</Text>
      
      {/* Карточка 1 */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleRoleSelect('patient')}
      >
        <LinearGradient
          colors={['#6A85E5', '#3D54DA']}
          style={styles.cardGradient}
        >
          <Text style={styles.cardText}>Пациент</Text>
          <MaterialCommunityIcons
            name="account-heart"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Карточка 2 */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleRoleSelect('admin')}
      >
        <LinearGradient
          colors={['#6A85E5', '#3D54DA']}
          style={styles.cardGradient}
        >
          <Text style={styles.cardText}>Врач</Text>
          <MaterialCommunityIcons
            name="stethoscope"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Карточка 3 */}
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleReset}
      >
        <LinearGradient
          colors={['#FF5C5C', '#FF8787']}
          style={styles.cardGradient}
        >
          <Text style={styles.cardText}>Выйти</Text>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f9fbfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  cardContainer: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});
