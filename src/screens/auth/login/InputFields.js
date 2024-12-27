import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

export default function InputFields({ email, password, onEmailChange, onPasswordChange }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Введите email"
        value={email}
        onChangeText={onEmailChange}
        style={styles.input}
      />
      <TextInput
        placeholder="Введите пароль"
        secureTextEntry
        value={password}
        onChangeText={onPasswordChange}
        style={styles.input}
      />
    </View>
  );
}
