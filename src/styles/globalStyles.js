import { StyleSheet } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Светлая тема
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: '#FFFFFF',
    primary: '#FFFFFF',
    text: '#000000',
    secondaryContainer: '#3D54DA',
    onSurfaceVariant: '#6E6E6E',
  },
};

// Темная тема
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#121212',
    primary: '#FFFFFF',
    text: '#FFFFFF',
    secondaryContainer: 'transparent',
    onSurfaceVariant: '#9E9E9E',
  },
};

export const globalStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
});
