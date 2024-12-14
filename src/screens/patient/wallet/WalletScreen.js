import React from 'react';
import { View } from 'react-native';
import BalanceCard from './BalanceCard';
import ActionButtons from './ActionButtons';
import SectionHeader from './SectionHeader';
import TransactionList from './TransactionList'; // Используем общий компонент для списка
import styles from './styles';

// Данные для списка транзакций
const transactions = [
  { id: '1', title: 'Прием врача терапевта', subtitle: '20 декабря, 10:00', amount: '₽1000', icon: 'cart-heart' },
];

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      {/* Карточка баланса */}
      <BalanceCard />

      {/* Кнопки действий */}
      <ActionButtons />

      {/* Заголовок для раздела транзакций */}
      <SectionHeader title="Бонусные операции" />

      {/* Список транзакций */}
      <TransactionList transactions={transactions} />
    </View>
  );
}
