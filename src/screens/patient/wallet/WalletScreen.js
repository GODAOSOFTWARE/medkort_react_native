import React from 'react';
import { View, FlatList } from 'react-native';
import BalanceCard from './BalanceCard';
import ActionButtons from './ActionButtons';
import TransactionItem from './TransactionItem';
import styles from './styles'; // Подключаем стили

// Данные для списка транзакций (пример)
const transactions = [
  { id: '1', title: 'Прием врача терапевта', amount: '$1,230', icon: 'arrow-up' },
  { id: '2', title: 'Starbucks', amount: '$92', icon: 'coffee' },
  { id: '3', title: 'Payment received', amount: '$350', icon: 'arrow-down' },
];

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      {/* Карточка баланса */}
      <BalanceCard />

      {/* Кнопки действий */}
      <ActionButtons />

      {/* Список транзакций */}
      <FlatList
        style={styles.transactionList}
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            title={item.title}
            amount={item.amount}
            icon={item.icon}
          />
        )}
      />
    </View>
  );
}
