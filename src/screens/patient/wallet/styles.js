import { StyleSheet } from 'react-native';
import { responsiveSizes } from '../../../styles/styles.responsive';

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: responsiveSizes.margin.medium,
    paddingHorizontal: responsiveSizes.padding.medium,
  },
  actionButton: {
    backgroundColor: '#F5F5F5', // Светло-серый фон кнопок
    borderRadius: 15,
    padding: responsiveSizes.padding.medium,
    alignItems: 'center',
    width: responsiveSizes.button.width,
    height: responsiveSizes.button.height,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Тень с прозрачностью
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, // Полная непрозрачность тени
    shadowRadius: 10, // Радиус тени
    elevation: 3, // Для Android
  },
  actionIcon: {
    width: responsiveSizes.icon.large,
    height: responsiveSizes.icon.large,
    marginBottom: responsiveSizes.margin.small,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: responsiveSizes.text.small,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
