import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { buttonStyles } from '../../styles/styles.buttons';

export default function ActionButtons() {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => console.log('Register')}
        style={buttonStyles.primary}
      >
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => console.log('Sign In')}
        style={buttonStyles.secondary}
      >
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
