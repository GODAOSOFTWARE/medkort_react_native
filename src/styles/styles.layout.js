import { StyleSheet, Dimensions } from 'react-native';
import { responsiveSizes, SCREEN_SIZES } from './styles.responsive';
import { themeStyles } from './styles.theme';

const { width } = Dimensions.get('window');

// Определяем текущий размер экрана
const getScreenSize = () => {
  if (width < 360) return 'XS';
  if (width >= 360 && width < 414) return 'S';
  if (width >= 414 && width < 600) return 'M';
  if (width >= 600 && width < 768) return 'L';
  if (width >= 768 && width < 1024) return 'XL';
  return 'XXL';
};

// Получаем текущую букву для экрана
const currentSize = getScreenSize();

export const layoutStyles = StyleSheet.create({
  // Шапка (Header)
  header: {
    height: responsiveSizes.header.height, // Адаптивная высота шапки
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSizes.padding[currentSize], // Адаптивные отступы
    backgroundColor: themeStyles.colors.primary,
  },

  // Нижнее меню (BottomTabs)
  bottomTabs: {
    height: responsiveSizes.bottomTabs[currentSize], // Адаптивная высота нижнего меню
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: responsiveSizes.padding[currentSize],
    backgroundColor: themeStyles.colors.background,
  },
});
