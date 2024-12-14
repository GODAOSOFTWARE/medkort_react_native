import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль пользователя</Text>
      <Text style={styles.text}>Имя: Иван Иванов</Text>
      <Text style={styles.text}>Email: ivanov@example.com</Text>
      <Text style={styles.text}>Телефон: +7 (999) 123-45-67</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
});
