// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Настройки</Text>
      {/* Добавьте настройки приложения здесь */}
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
