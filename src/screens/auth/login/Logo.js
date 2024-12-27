import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}
