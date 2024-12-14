import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export default function TransactionItem({ icon, title, subtitle, amount, color }) {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <MaterialCommunityIcons name={icon} style={[styles.transactionIcon, { color }]} />
        <View>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text style={styles.transactionAmount}>{amount}</Text>
    </View>
  );
}
