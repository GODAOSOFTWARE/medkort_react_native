import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Title from './Title';
import SocialButtons from './SocialButtons';
import RegistrationForm from './RegistrationForm';
import ActionButtons from './ActionButtons';
import { responsiveSizes } from '../../styles/styles.responsive';

export default function RegisterScreen() {
  return (
    <LinearGradient colors={['#187bcd', '#4e9af1']} style={styles.container}>
      <Title />
      <SocialButtons />
      <RegistrationForm />
      <ActionButtons />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveSizes.padding.medium,
  },
});
