import { StyleSheet } from 'react-native';
import { responsiveSizes } from './styles.responsive';
import { themeStyles } from './styles.theme';

export const textStyles = StyleSheet.create({
  // Основной текст
  text: {
    fontSize: responsiveSizes.text.medium, // Адаптивный размер текста
    color: themeStyles.colors.text,
  },

  // Заголовок
  title: {
    fontSize: responsiveSizes.text.large, // Адаптивный размер заголовка
    color: themeStyles.colors.text,
    fontWeight: 'bold',
  },

  // Мелкий текст
  smallText: {
    fontSize: responsiveSizes.text.small,
    color: themeStyles.colors.textSecondary, // Вторичный текст
  },
});
