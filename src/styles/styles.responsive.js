import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Определяем базовые размеры для iPhone 14 Pro Max
const LARGE_BASE_WIDTH = 430;

// Функция масштабирования
const scale = (size, baseWidth = LARGE_BASE_WIDTH) => (width / baseWidth) * size;

// Определяем категории экранов
const getSizeCategory = () => {
  if (width <= 360) {
    return 'small';
  } else if (width > 360 && width <= 414) {
    return 'medium';
  } else {
    return 'large';
  }
};

// Экспортируем размеры для различных категорий
const responsiveSizes = {
  padding: {
    small: scale(8),
    medium: scale(12),
    large: scale(16),
  },
  text: {
    small: scale(12),
    medium: scale(16),
    large: scale(20),
  },
  icon: {
    small: scale(16),
    medium: scale(24),
    large: scale(32),
  },
  margin: {
    small: scale(8),
    medium: scale(12),
    large: scale(16),
  },
  button: {
    small: scale(40),
    medium: scale(48),
    large: scale(56),
    extraLarge: scale(78),
  },
  input: {
    height: scale(44),
    fontSize: scale(14),
  },
};

// Экспортируем все элементы
export { responsiveSizes, getSizeCategory };
