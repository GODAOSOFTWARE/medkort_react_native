import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';

export default function InputFields({ email, setEmail, password, setPassword, showPassword, setShowPassword }) {
  return (
    <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
    </View>
  );
}
