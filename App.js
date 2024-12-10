import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';

// Единственная тема приложения (Светлая)
const lightTheme = {
  headerBackground: '#FFFFFF', // Фон шапки белый
  headerIconColor: '#000000', // Цвет иконок в шапке черный
  bottomBarBackground: '#FFFFFF', // Фон нижней панели белый
  bottomBarActiveColor: '#000000', // Цвет активной кнопки черный
  bottomBarInactiveColor: '#A6A6A6', // Цвет неактивной кнопки серый
};

export default function App() {
  // Текущее состояние (выбранная вкладка)
  const [index, setIndex] = useState(0);

  // URL сайта для текущей вкладки
  const [currentUrl, setCurrentUrl] = useState('https://medkort.ru/?view=app ');


  // Показывать ли индикатор загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Название текущего раздела в шапке
  const [headerTitle, setHeaderTitle] = useState('Наши продукты');

  // Массив маршрутов для нижней панели навигации
  const routes = [
    {
      key: 'home',
      title: 'Наши продукты',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
      url: 'https://medkort.ru/?view=app',
    },
    {
      key: 'appointments',
      title: 'Расписание приемов',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
      url: 'https://medkort.ru/lk/profile?view=app&item=appointments',
    },
    {
      key: 'treatment',
      title: 'Планы лечения',
      focusedIcon: 'medical-bag',
      unfocusedIcon: 'medical-bag',
      url: 'https://medkort.ru/lk/profile?view=app&item=recommendations',
    },
    {
      key: 'wallet',
      title: 'Бонусная программа',
      focusedIcon: 'gift',
      unfocusedIcon: 'gift-outline',
      url: 'https://medkort.ru/lk/profile?view=app&item=wallet',
    },
  ];

  // Обработчик переключения вкладок
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    setHeaderTitle(routes[newIndex].title); // Обновляем заголовок
    if (routes[newIndex].url) {
      setIsLoading(true);
      setCurrentUrl(routes[newIndex].url);
    }
  };

  // Обработчики для кнопок в шапке
  const handleProfileClick = () => {
    setCurrentUrl('https://medkort.ru/lk/profile?view=app'); // Устанавливаем URL профиля
    setHeaderTitle('Профиль'); // Устанавливаем заголовок "Профиль"
  };

  const handleSettingsClick = () => {
    setCurrentUrl('https://medkort.ru/lk/profile?view=app&item=settings'); // Устанавливаем URL настроек
    setHeaderTitle('Настройки'); // Устанавливаем заголовок "Настройки"
  };

  // Компонент для отображения вебвью (сайт)
  const renderScene = () => (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={lightTheme.bottomBarActiveColor} />
        </View>
      )}
      <WebView
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor={lightTheme.headerBackground} />

        {/* Шапка приложения */}
        <Appbar.Header style={[styles.header, { backgroundColor: lightTheme.headerBackground }]}>
          {/* Иконка профиля */}
          <Appbar.Action
            icon="account-circle"
            onPress={handleProfileClick} // Открываем профиль
            color={lightTheme.headerIconColor}
            size={30}
          />
          {/* Название текущей вкладки */}
          <Text style={[styles.title, { color: lightTheme.headerIconColor }]}>{headerTitle}</Text>
          {/* Иконка настроек */}
          <TouchableOpacity onPress={handleSettingsClick}>
            <Appbar.Action
              icon="cog"
              color={lightTheme.headerIconColor}
              size={30}
            />
          </TouchableOpacity>
        </Appbar.Header>

        {/* Нижняя панель навигации */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          barStyle={{ backgroundColor: lightTheme.bottomBarBackground }}
          activeColor={lightTheme.bottomBarActiveColor}
          inactiveColor={lightTheme.bottomBarInactiveColor}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}


// Стили приложения
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Располагаем элементы в строку
    alignItems: 'center', // Выравниваем элементы по центру по вертикали
    justifyContent: 'space-between', // Пространство между элементами
    paddingHorizontal: 8, // Отступы по горизонтали
  },
  title: {
    fontSize: 20, // Размер текста
    fontWeight: 'bold', // Жирный текст
  },
  loader: {
    position: 'absolute', // Положение поверх остальных элементов
    top: 0, left: 0, right: 0, bottom: 0, // Занимает весь экран
    justifyContent: 'center', // Центрируем по вертикали
    alignItems: 'center', // Центрируем по горизонтали
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Полупрозрачный белый фон
    zIndex: 10, // Поверх всех элементов
  },
});