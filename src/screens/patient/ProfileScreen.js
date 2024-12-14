// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Профиль</Text>
      {/* Добавьте содержимое профиля здесь */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
