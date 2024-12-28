import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Получаем ширину экрана
const elementWidth = screenWidth * 0.9; // Общая ширина для кнопки и полей (90% экрана)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    backgroundColor: '#3D54DA',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: elementWidth, // Поля ввода шириной с кнопкой
    marginBottom: 20,
    alignSelf: 'center', // Центровка на экране
  },
  button: {
    marginTop: 10,
    width: elementWidth, // Кнопка задаёт ширину
    alignSelf: 'center', // Центровка на экране
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#3D54DA', // Синий цвет кнопки
  },
});

export default styles;
