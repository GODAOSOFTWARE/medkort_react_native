import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textStyles } from '../../styles/styles.text';

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={textStyles.title}>Welcome</Text>
      <Text style={textStyles.text}>Register with</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
