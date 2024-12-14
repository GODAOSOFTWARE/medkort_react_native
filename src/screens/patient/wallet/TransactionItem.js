import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export default function TransactionItem({ icon, title, subtitle, amount, type }) {
  const isIncoming = type === 'Входящая';

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <MaterialCommunityIcons
          name={icon}
          style={styles.transactionIcon} // Черная иконка
        />
        <View>
          <Text style={styles.transactionText}>{title}</Text> {/* Черный текст */}
          <Text style={styles.transactionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          isIncoming ? styles.incomingStyle : styles.outgoingStyle,
        ]}
      >
        {amount}
      </Text>
    </View>
  );
}
