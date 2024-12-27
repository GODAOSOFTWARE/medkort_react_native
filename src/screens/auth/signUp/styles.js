import { StyleSheet } from 'react-native';
import { responsiveSizes } from '../../../styles/styles.responsive'; // Импорт адаптивных размеров
import { themeStyles } from '../../../styles/styles.theme'; // Импорт темы

export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.colors.background,
    padding: responsiveSizes.padding.medium,
  },
});
