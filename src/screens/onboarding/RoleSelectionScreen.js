import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = (roleKey) => {
    if (roleKey === 'patient') {
      navigation.replace('PatientProfile');
    } else if (roleKey === 'doctor') {
      navigation.replace('DoctorProfile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите роль</Text>
      <Text style={styles.subtitle}>Подберите подходящий интерфейс</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleRoleSelect('patient')} style={styles.roleButton}>
          <LinearGradient colors={['#6A85E5', '#3D54DA']} style={styles.roleButtonGradient}>
            <Text style={styles.roleButtonText}>Пациент</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRoleSelect('doctor')} style={styles.roleButton}>
          <LinearGradient colors={['#6A85E5', '#3D54DA']} style={styles.roleButtonGradient}>
            <Text style={styles.roleButtonText}>Врач</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.agreementText}>
        Нажимая на кнопку, вы соглашаетесь с{' '}
        <Text style={styles.link}>Условиями использования</Text>,{' '}
        <Text style={styles.link}>Политикой конфиденциальности</Text> и{' '}
        <Text style={styles.link}>Политикой использования файлов cookie</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Отступ для шапки
    backgroundColor: '#f9fbfc', // Светлый фон
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
  roleButton: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  roleButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  agreementText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#3D54DA',
    textDecorationLine: 'underline',
  },
});
