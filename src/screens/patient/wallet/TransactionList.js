import React from 'react';
import { View, FlatList } from 'react-native';
import TransactionItem from './TransactionItem';
import styles from './styles';

const transactions = [
  { id: '1', icon: 'cart-outline', title: 'Starbucks', amount: '-$12', color: '#FF6F61' },
  { id: '2', icon: 'bank-outline', title: 'Salary', amount: '+$3,000', color: '#28A745' },
  { id: '3', icon: 'cash-refund', title: 'Refund', amount: '+$150', color: '#007BFF' },
];

export default function TransactionList() {
  return (
    <View style={styles.transactionList}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem icon={item.icon} title={item.title} amount={item.amount} color={item.color} />
        )}
      />
    </View>
  );
}
