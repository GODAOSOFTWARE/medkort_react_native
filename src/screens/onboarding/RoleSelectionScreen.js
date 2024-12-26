import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params; // Получаем переданные опции из навигации

  const handleRoleSelect = (roleKey) => {
    console.log(`RoleSelectionScreen: Выбрана роль - ${roleKey}`);
    if (roleKey === 'patient') {
      navigation.replace('ProductsScreen'); // Перенаправление на кабинет пациента
    } else {
      navigation.replace(`${roleKey}Dashboard`); // Перенаправление на соответствующий кабинет
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Личный кабинет</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.buttonContainer}
          onPress={() => handleRoleSelect(option.key)}
        >
          {/* Градиент для кнопки */}
          <LinearGradient
            colors={['#187bcd', '#4e9af1']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{option.label}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden', // Убираем выход текста за границы кнопки
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
