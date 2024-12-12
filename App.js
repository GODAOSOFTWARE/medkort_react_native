import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';


// Создаем кастомные темы для светлого и темного интерфейса
const lightTheme = {
  ...MD3LightTheme, // Базовая светлая тема из react-native-paper
  colors: {
    ...MD3LightTheme.colors, // Все стандартные цвета темы
    background: '#FFFFFF', // Белый фоsн
    primary: '#000000', // Основной цвет (иконки, активные элементы)
    text: '#000000', // Черный текст
    rippleColor: '#FFD700', // Цвет анимации выделения (золотистый)
  },
};

const darkTheme = {
  ...MD3DarkTheme, // Базовая темная тема из react-native-paper
  colors: {
    ...MD3DarkTheme.colors, // Все стандартные цвета темы
    background: '#121212', // Темный фон
    primary: '#FFFFFF', // Основной цвет (иконки, активные элементы)
    text: '#FFFFFF', // Белый текст
    rippleColor: '#FF4500', // Цвет анимации выделения (оранжевый)
  },
};

export default function App() {
  const systemTheme = useColorScheme(); // Получаем текущую системную тему ('light' или 'dark')
  const [currentTheme, setCurrentTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme); // Устанавливаем тему приложения на основе системной

  const [index, setIndex] = useState(0); // Индекс активной вкладки
  const [currentUrl, setCurrentUrl] = useState('https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md'); // Текущий URL для WebView
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки страницы
  const [headerTitle, setHeaderTitle] = useState('Наши продукты'); // Заголовок в шапке

  // Маршруты для нижней навигации
  const routes = [
    { key: 'home', title: 'Медкорт AI Alpha 1.0', focusedIcon: 'home', unfocusedIcon: 'home-outline', url: 'https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md' },
    { key: 'appointments', title: 'Расписание приемов', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
    { key: 'treatment', title: 'Планы лечения', focusedIcon: 'medical-bag', unfocusedIcon: 'medical-bag-outline', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
    { key: 'wallet', title: 'Бонусная программа', focusedIcon: 'gift', unfocusedIcon: 'gift-outline', url: 'https://medkort.ru/lk/profile?view=app&item=wallet' },
  ];

  // Обработка смены вкладки
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex); // Устанавливаем новый индекс
    setHeaderTitle(routes[newIndex].title); // Меняем заголовок на основе выбранной вкладки
    setIsLoading(true); // Включаем индикатор загрузки
    setCurrentUrl(routes[newIndex].url); // Устанавливаем новый URL для WebView
  };

  // Открыть профиль
  const handleProfileClick = () => {
    setCurrentUrl('https://medkort.ru/lk/profile?view=app'); // Устанавливаем URL для профиля
    setHeaderTitle('Профиль'); // Меняем заголовок на "Профиль"
  };

  // Открыть настройки
  const handleSettingsClick = () => {
    setCurrentUrl('https://medkort.ru/lk/profile?view=app&item=settings'); // Устанавливаем URL для настроек
    setHeaderTitle('Настройки'); // Меняем заголовок на "Настройки"
  };

  // Рендеринг WebView с индикатором загрузки
  const renderScene = () => (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View style={styles.loader}>
          {/* Показываем индикатор загрузки */}
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        </View>
      )}
      <WebView
        source={{ uri: currentUrl }} // Загружаем текущий URL
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)} // Включаем индикатор при начале загрузки
        onLoadEnd={() => setIsLoading(false)} // Отключаем индикатор при завершении загрузки
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Обертка для жестов */}
      <PaperProvider theme={currentTheme}>
        {/* Передаем текущую тему */}
        <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
        {/* Шапка приложения */}
        <Appbar.Header style={[styles.header, { backgroundColor: currentTheme.colors.background }]}>
          <Appbar.Action icon="account-circle" onPress={handleProfileClick} color={currentTheme.colors.primary} size={30} />
          <Text style={[styles.title, { color: currentTheme.colors.primary }]}>{headerTitle}</Text>
          <TouchableOpacity onPress={handleSettingsClick}>
            <Appbar.Action icon="cog" color={currentTheme.colors.primary} size={30} />
          </TouchableOpacity>
        </Appbar.Header>
        {/* Нижняя панель навигации */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          barStyle={{ backgroundColor: currentTheme.colors.background }}
          activeColor={currentTheme.colors.primary} // Цвет активных иконок
          inactiveColor={currentTheme.colors.text} // Цвет неактивных иконок
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

// Стили
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Горизонтальное расположение элементов
    alignItems: 'center', // Выравнивание по вертикали
    justifyContent: 'space-between', // Пробел между элементами
    paddingHorizontal: 8, // Горизонтальные отступы
  },
  title: {
    fontSize: 20, // Размер текста
    fontWeight: 'bold', // Жирный шрифт
  },
  loader: {
    position: 'absolute', // Абсолютное позиционирование
    top: 0, left: 0, right: 0, bottom: 0, // Занимает весь экран
    justifyContent: 'center', // Центрирование по вертикали
    alignItems: 'center', // Центрирование по горизонтали
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Полупрозрачный фон
    zIndex: 10, // Поверх остальных элементов
  },
});
