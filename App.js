/**
 * Путь к файлу: ./App.js
 * 
 * Этот файл является точкой входа в приложение.
 * Он определяет тему, управляет состояниями и отображает основные компоненты приложения.
 */

import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './src/components/Header';
import BottomTabs from './src/components/BottomTabs';
import { globalStyles, lightTheme, darkTheme } from './src/styles/globalStyles';

export default function App() {
  const systemTheme = useColorScheme(); // Определение системной темы (светлая или темная)

  // Инициализация состояний для темы, вкладок, заголовка, URL и загрузки
  const [currentTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [index, setIndex] = useState(0);
  const [headerTitle, setHeaderTitle] = useState('Добро пожаловать');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Определение маршрутов для нижних вкладок
  const routes = [
    { key: 'home', title: 'Продукты', focusedIcon: 'home', unfocusedIcon: 'home', url: 'https://medkort.ru/?view=app' },
    { key: 'appointments', title: 'Расписание', focusedIcon: 'calendar', unfocusedIcon: 'calendar', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
    { key: 'treatment', title: 'Лечение', focusedIcon: 'medical-bag', unfocusedIcon: 'medical-bag', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
    { key: 'wallet', title: 'Кошелек', focusedIcon: 'gift', unfocusedIcon: 'gift' },
  ];

  // Обработка изменения активной вкладки
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    setHeaderTitle(routes[newIndex].title);
    setIsLoading(true);
    setCurrentUrl(routes[newIndex].url);
  };

  // Рендеринг приложения с темой, заголовком и нижними вкладками
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Контейнер для поддержки жестов */}
      <PaperProvider theme={currentTheme}> {/* Провайдер темы для компонентов */}
        <Header title={headerTitle} theme={currentTheme} /> {/* Отображение заголовка */}
        <BottomTabs
          routes={routes} // Маршруты для вкладок
          index={index} // Текущая активная вкладка
          onIndexChange={handleIndexChange} // Обработка переключения вкладок
          currentUrl={currentUrl} // Текущий URL страницы
          setCurrentUrl={setCurrentUrl} // Обновление текущего URL
          setIsLoading={setIsLoading} // Управление состоянием загрузки
          theme={currentTheme} // Используемая тема приложения
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
