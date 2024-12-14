import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360; // Условие для определения маленьких экранов

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  // Стили для карточки баланса
  balanceCard: {
    backgroundColor: '#3D54DA',
    borderRadius: 12,
    padding: isSmallScreen ? 16 : 20, // Адаптивное значение отступов
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  balanceText: {
    fontSize: isSmallScreen ? 28 : 36, // Адаптивный размер шрифта
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  cardDetails: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#E0E0E0',
  },

  // Стили для кнопок действий
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Белый фон кнопки
    borderRadius: 16, // Закруглённые углы
    paddingVertical: isSmallScreen ? 10 : 12, // Адаптивные отступы
    marginHorizontal: 8, // Горизонтальные отступы между кнопками
    shadowColor: '#000', // Чёрный цвет для тени
    shadowOffset: { width: 0, height: 2 }, // Смещение тени вниз
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 4, // Радиус размытия тени
    elevation: 3, // Поднятие кнопки (объём)
  },

  actionIcon: {
    fontSize: isSmallScreen ? 24 : 28, // Размер иконки
    color: '#0D161D', // Цвет иконки
    marginBottom: 8,
  },

  actionText: {
    fontSize: isSmallScreen ? 12 : 14, // Размер текста
    fontWeight: '600',
    color: '#0D161D',
  },

  // Стили для истории транзакций
  transactionList: {
    flex: 1,
  },

  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: isSmallScreen ? 10 : 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionIcon: {
    fontSize: isSmallScreen ? 20 : 24, // Размер иконки
    color: '#3D54DA',
    marginRight: 16,
  },

  transactionText: {
    fontSize: isSmallScreen ? 14 : 16, // Размер текста
    color: '#000000',
  },

  transactionAmount: {
    fontSize: isSmallScreen ? 14 : 16, // Размер суммы
    fontWeight: 'bold',
    color: '#3D54DA',
  },
});

export default styles;