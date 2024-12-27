import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Базовая ширина экрана (например, iPhone X с шириной 375px)
const BASE_WIDTH = 375;

// Функция масштабирования
const scale = (size) => (width / BASE_WIDTH) * size;

// Экспортируем размеры для использования в стилях
export const responsiveSizes = {
  padding: {
    small: scale(8), // маленький отступ
    medium: scale(12), // средний отступ
    large: scale(16), // большой отступ
  },
  text: {
    small: scale(12), // маленький текст
    medium: scale(16), // средний текст
    large: scale(20), // большой текст
  },
  icon: {
    small: scale(16), // маленькая иконка
    medium: scale(24), // средняя иконка
    large: scale(32), // большая иконка
  },
  margin: {
    small: scale(8), // маленький отступ
    medium: scale(12), // средний отступ
    large: scale(16), // большой отступ
  },
  header: {
    height: scale(64), // высота заголовка
  },
  button: {
    height: scale(48), // высота кнопки
    fontSize: scale(50), // размер текста кнопки
  },
  input: {
    height: scale(44), // высота поля ввода
    fontSize: scale(14), // размер текста в поле ввода
  },
};

// Экспорт для использования в компоненте
export default responsiveSizes;
