import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
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
    shadowOffset: { width: 0, height: 4 }, // Более выраженная тень
    shadowOpacity: 0.2, // Прозрачность тени увеличена
    shadowRadius: 10, // Радиус размытия увеличен
    elevation: 6, // Более заметное поднятие для Android
  },
  balanceText: {
    fontSize: isSmallScreen ? 28 : 36, // Адаптивный размер шрифта
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '400', // Дополнено для соответствия Material Design
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
    paddingVertical: isSmallScreen ? 8 : 10, // Уменьшенные отступы
    marginHorizontal: 4, // Сокращенные отступы для размещения 4 кнопок
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Более выраженная тень
    shadowOpacity: 0.2, // Прозрачность тени увеличена
    shadowRadius: 6, // Радиус размытия увеличен
    elevation: 5, // Более заметное поднятие для Android
  },
  actionIcon: {
    fontSize: isSmallScreen ? 24 : 28, // Размер иконки
    color: '#0D161D', // Цвет иконки
    marginBottom: 8,
  },
  actionText: {
    fontSize: isSmallScreen ? 10 : 12, // Адаптивный размер шрифта
    fontWeight: '500',
    color: '#0D161D',
    textAlign: 'center', // Центровка текста
    flexWrap: 'wrap', // Перенос текста при нехватке места
    maxWidth: '80%', // Ограничение ширины текста
  },

  // Стили для заголовков разделов
  sectionHeader: {
    fontSize: isSmallScreen ? 20 : 22, // Адаптивный размер шрифта
    fontWeight: 'bold', // Жирность заголовка
    color: '#0D161D',
    marginBottom: 12,
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
    backgroundColor: '#FFFFFF', // Белый фон для карточки транзакции
    borderRadius: 8, // Закругленные углы для карточек
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, // Более выраженная тень
    shadowOpacity: 0.15, // Прозрачность тени увеличена
    shadowRadius: 6, // Радиус размытия увеличен
    elevation: 4, // Поднятие для Android
    marginBottom: 8, // Отступ между карточками
    paddingHorizontal: 12, // Горизонтальные отступы внутри карточки
  },
  transactionDetails: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16,
  },
  transactionText: {
    fontSize: isSmallScreen ? 14 : 16, // Размер текста
    fontWeight: '500', // Жирность текста
    color: '#0D161D',
  },
  transactionSubtitle: {
    fontSize: isSmallScreen ? 12 : 14, // Размер подзаголовка
    fontWeight: '400', // Жирность подзаголовка
    color: '#9E9E9E',
  },
  transactionAmount: {
    fontSize: isSmallScreen ? 14 : 16, // Размер суммы
    fontWeight: '600',
    color: '#3D54DA',
  },

  // Стили для иконок транзакций
  transactionIcon: {
    fontSize: isSmallScreen ? 20 : 24, // Размер иконки
    color: '#3D54DA',
  },
});

export default styles;