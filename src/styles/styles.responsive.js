import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Категории размеров экранов
export const SCREEN_SIZES = {
  XS: width < 360,                         // Очень маленькие экраны
  S: width >= 360 && width < 414,          // Маленькие телефоны
  M: width >= 414 && width < 600,          // Средние телефоны
  L: width >= 600 && width < 768,          // Планшеты в портретной ориентации
  XL: width >= 768 && width < 1024,        // Планшеты в ландшафтной ориентации
  XXL: width >= 1024,                      // Мониторы и большие экраны
};

// Универсальные адаптивные размеры
export const responsiveSizes = {
  padding: {
    small: SCREEN_SIZES.XS ? 8 : SCREEN_SIZES.S ? 10 : SCREEN_SIZES.M ? 12 : SCREEN_SIZES.L ? 14 : 16,
    medium: SCREEN_SIZES.XS ? 12 : SCREEN_SIZES.S ? 14 : SCREEN_SIZES.M ? 16 : SCREEN_SIZES.L ? 18 : 20,
    large: SCREEN_SIZES.XS ? 14 : SCREEN_SIZES.S ? 16 : SCREEN_SIZES.M ? 18 : SCREEN_SIZES.L ? 20 : 24,
  },
  text: {
    small: SCREEN_SIZES.XS ? 10 : SCREEN_SIZES.S ? 12 : SCREEN_SIZES.M ? 14 : SCREEN_SIZES.L ? 16 : 18,
    medium: SCREEN_SIZES.XS ? 12 : SCREEN_SIZES.S ? 14 : SCREEN_SIZES.M ? 16 : SCREEN_SIZES.L ? 18 : 20,
    large: SCREEN_SIZES.XS ? 14 : SCREEN_SIZES.S ? 16 : SCREEN_SIZES.M ? 18 : SCREEN_SIZES.L ? 20 : 22,
  },
  icon: {
    small: SCREEN_SIZES.XS ? 16 : SCREEN_SIZES.S ? 20 : SCREEN_SIZES.M ? 24 : SCREEN_SIZES.L ? 28 : 32,
    medium: SCREEN_SIZES.XS ? 20 : SCREEN_SIZES.S ? 24 : SCREEN_SIZES.M ? 28 : SCREEN_SIZES.L ? 32 : 36,
    large: SCREEN_SIZES.XS ? 24 : SCREEN_SIZES.S ? 28 : SCREEN_SIZES.M ? 32 : SCREEN_SIZES.L ? 36 : 40,
  },
  margin: {
    small: SCREEN_SIZES.XS ? 8 : SCREEN_SIZES.S ? 10 : SCREEN_SIZES.M ? 12 : SCREEN_SIZES.L ? 14 : 16,
    medium: SCREEN_SIZES.XS ? 10 : SCREEN_SIZES.S ? 12 : SCREEN_SIZES.M ? 14 : SCREEN_SIZES.L ? 16 : 18,
    large: SCREEN_SIZES.XS ? 12 : SCREEN_SIZES.S ? 14 : SCREEN_SIZES.M ? 16 : SCREEN_SIZES.L ? 18 : 20,
  },
  header: {
    height: SCREEN_SIZES.XS ? 48 : SCREEN_SIZES.S ? 56 : SCREEN_SIZES.M ? 64 : SCREEN_SIZES.L ? 72 : 80,
  },
  bottomTabs: {
    height: SCREEN_SIZES.XS ? 48 : SCREEN_SIZES.S ? 54 : SCREEN_SIZES.M ? 60 : SCREEN_SIZES.L ? 66 : 72,
  },
};
