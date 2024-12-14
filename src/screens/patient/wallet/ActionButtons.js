import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export default function ActionButtons() {
  const buttons = [
    
    { icon: 'cart-heart', text: 'Потратить' },
    { icon: 'gift-outline', text: 'Подарить' },
    { icon: 'wallet-plus-outline', text: 'Получить' },
    { icon: 'dots-horizontal-circle-outline', text: 'Подробнее' },
  ];

  return (
    <View style={styles.actionButtonsContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.actionButton}>
          <MaterialCommunityIcons name={button.icon} style={styles.actionIcon} />
          <Text style={styles.actionText}>{button.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
