import { StyleSheet } from 'react-native';
import { responsiveSizes } from './styles.responsive';
import { themeStyles } from './styles.theme';

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: themeStyles.colors.primary,
    paddingVertical: responsiveSizes.padding.medium, // Адаптивные вертикальные отступы
    paddingHorizontal: responsiveSizes.padding.large, // Адаптивные горизонтальные отступы
    borderRadius: responsiveSizes.margin.small,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: themeStyles.colors.textSecondary,
    paddingVertical: responsiveSizes.padding.small,
    paddingHorizontal: responsiveSizes.padding.medium,
    borderRadius: responsiveSizes.margin.medium,
    alignItems: 'center',
  },
});
