import React from 'react';
import { Avatar } from 'react-native-paper';
import styles from './styles';

export default function Logo() {
  return <Avatar.Icon size={100} icon="account-circle" style={styles.logo} />;
}
