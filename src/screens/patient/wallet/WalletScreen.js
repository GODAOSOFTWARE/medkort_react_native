import React from 'react';
import { View } from 'react-native';
import BalanceCard from './BalanceCard';
import ActionButtons from './ActionButtons';
import TransactionList from './TransactionList';
import styles from './styles';

// Данные для списка транзакций
const transactions = [
  {
    id: '1',
    title: 'Бонус за визит №100243',
    subtitle: '20 декабря, 10:00',
    amount: '+₽3,000',
    icon: 'wallet-plus-outline',
    type: 'Входящая',
  },
  {
    id: '2',
    title: 'Скидка на услугу',
    subtitle: 'Рентген носовых пазух',
    amount: '-₽1,230',
    icon: 'cart-heart',
    type: 'Исходящая',
  },
  {
    id: '3',
    title: 'Агентское вознаграждение',
    subtitle: 'Партнер: Сидоров И',
    amount: '+₽500',
    icon: 'trophy-outline',
    type: 'Входящая',
  },
  {
    id: '4',
    title: 'Оплата повторного приема',
    subtitle: '21 декабря, 15:00',
    amount: '-₽1,500',
    icon: 'account-outline',
    type: 'Исходящая',
  },
];

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      {/* Карточка баланса */}
      <BalanceCard />
      {/* Кнопки действий */}
      <ActionButtons />
      {/* Список транзакций */}
      <TransactionList transactions={transactions} />
    </View>
  );
}
