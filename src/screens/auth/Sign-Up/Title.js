import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../../styles/styles.text'; // Импорт текстовых стилей

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={textStyles.title}>Create Account</Text>
      <Text style={textStyles.text}>Sign up to get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
