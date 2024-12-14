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
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: isSmallScreen ? 10 : 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  actionIcon: {
    fontSize: isSmallScreen ? 20 : 24,
    color: '#3D54DA',
    marginBottom: 8,
  },

  actionText: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: '#3D54DA',
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
    fontSize: isSmallScreen ? 20 : 24,
    color: '#3D54DA',
    marginRight: 16,
  },

  transactionText: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#000000',
  },

  transactionAmount: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
    color: '#3D54DA',
  },
});

export default styles;
