import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FFFFFF',
    primary: '#000000',
    text: '#000000',
    rippleColor: '#FFD700',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#121212',
    primary: '#FFFFFF',
    text: '#FFFFFF',
    rippleColor: '#FF4500',
  },
};
