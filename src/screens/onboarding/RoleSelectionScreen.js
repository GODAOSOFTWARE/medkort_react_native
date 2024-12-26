import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelect = (role) => {
    console.log('RoleSelectionScreen: Выбрана роль:', role);
    if (role === 'patient') {
      navigation.replace('ProductsScreen');
    } else if (role === 'doctor') {
      navigation.replace('DoctorDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите вашу роль</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelect('patient')}
      >
        <Text style={styles.buttonText}>Пациент</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelect('doctor')}
      >
        <Text style={styles.buttonText}>Врач</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
