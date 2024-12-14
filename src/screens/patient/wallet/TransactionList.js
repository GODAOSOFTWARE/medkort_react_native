import React from 'react';
import { View, FlatList } from 'react-native';
import TransactionItem from './TransactionItem';
import styles from './styles';

const transactions = [
  {
    id: '1',
    title: 'Бонус за визит №100243',
    subtitle: '20 декабря, 10:00',
    amount: '₽3,000',
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
    subtitle: '20 декабря, 10:30',
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


export default function TransactionList() {
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
            type={item.type}
          />
        )}
      />
    </View>
  );
}
