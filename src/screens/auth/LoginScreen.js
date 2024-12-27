import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={['#3D54DA', '#6A85E5']} style={styles.header}>
        <Text style={styles.headerTitle}>Медкорт</Text>
        <Text style={styles.headerSubtitle}>Врач всегда рядом</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="apple" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Или войдите по адресу электронной почты</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={[
            styles.input,
            focusedField === 'email' && styles.inputFocused,
          ]}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#3D54DA' } }}
        />
        <TextInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={[
            styles.input,
            focusedField === 'password' && styles.inputFocused,
          ]}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
          secureTextEntry
          theme={{ colors: { text: '#333', placeholder: '#aaa', primary: '#3D54DA' } }}
        />
        <View style={styles.checkboxRow}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="#3D54DA"
          />
          <Text style={styles.checkboxText}>Запомнить меня</Text>
        </View>
        <Button mode="contained" onPress={() => {}} style={styles.signInButton}>
          Войти
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfc',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  form: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -40,
  },
  formTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: 'linear-gradient(90deg, #3D54DA, #6A85E5)',
    borderWidth: 1.5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#333',
  },
  signInButton: {
    backgroundColor: '#3D54DA',
    paddingVertical: 12,
    borderRadius: 8,
  },
});
