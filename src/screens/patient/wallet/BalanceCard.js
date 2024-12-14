import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function BalanceCard() {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceText}>₽ 3,521</Text>
      <Text style={styles.cardDetails}>*Бонусный баланс</Text>
    </View>
  );
}
