import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

export default function SubmitButton({ handleLogin, isLoading }) {
  return (
    <Button
      mode="contained"
      onPress={handleLogin}
      style={styles.button}
      loading={isLoading}
      disabled={isLoading}
    >
      Войти
    </Button>
  );
}
