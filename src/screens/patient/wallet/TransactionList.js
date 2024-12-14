import React from 'react';
import { View, FlatList } from 'react-native';
import TransactionItem from './TransactionItem';
import styles from './styles';

export default function TransactionList({ transactions }) {
  return (
    <View style={styles.transactionList}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            amount={item.amount}
          />
        )}
      />
    </View>
  );
}
