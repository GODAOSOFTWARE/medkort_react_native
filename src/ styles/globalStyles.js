import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window'); // Размеры экрана для адаптивности

const globalStyles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Горизонтальное расположение
    alignItems: 'center', // Выравнивание по вертикали
    justifyContent: 'space-between', // Пространство между элементами
    paddingHorizontal: width * 0.02, // Адаптивные отступы
    height: height * 0.1, // Адаптивная высота
  },
  title: {
    fontSize: width < 360 ? 16 : 20, // Размер текста зависит от ширины экрана
    fontWeight: 'bold', // Жирный шрифт
  },
  loader: {
    position: 'absolute', // Абсолютное позиционирование
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Центрирование по вертикали
    alignItems: 'center', // Центрирование по горизонтали
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Полупрозрачный белый фон
    zIndex: 10, // Поверх других элементов
  },
});

export default globalStyles;
