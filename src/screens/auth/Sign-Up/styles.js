import { StyleSheet } from 'react-native';
import { responsiveSizes } from '../../styles/styles.responsive';
import { themeStyles } from '../../styles/styles.theme';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyles.colors.background,
    padding: responsiveSizes.padding.medium,
  },
});
