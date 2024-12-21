import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Светлая тема
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FFFFFF',
    primary: '#3D54DA',
    text: '#000000',
    textSecondary: '#757575',
  },
};

// Темная тема
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#121212',
    primary: '#BB86FC',
    text: '#FFFFFF',
    textSecondary: '#A1A1A1',
  },
};

// Экспортируем текущую тему
export const themeStyles = lightTheme; // Или переключать на `darkTheme` при необходимости
