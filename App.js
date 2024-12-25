import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/auth/LoginScreen'; // Импорт экрана авторизации

export default function App() {
  return (
    // Оборачиваем приложение в GestureHandlerRootView и PaperProvider для поддержки жестов и Material Design
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        {/* Рендерим только LoginScreen */}
        <LoginScreen />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
