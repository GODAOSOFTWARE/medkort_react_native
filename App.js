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
  const [currentUrl, setCurrentUrl] = useState('https://medkort.ru');

  // Показывать ли индикатор загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Массив маршрутов для нижней панели навигации
  const routes = [
    {
      key: 'home', // Уникальный идентификатор кнопки
      title: 'Наши продукты', // Название вкладки (отображается в шапке)
      focusedIcon: 'home', // Иконка для активного состояния
      unfocusedIcon: 'home-outline', // Иконка для неактивного состояния
      url: 'https://medkort.ru', // Ссылка на сайт
    },
    {
      key: 'appointments',
      title: 'Расписание приемов',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
      url: 'https://medkort.ru/lk/profile?item=appointments',
    },
    {
      key: 'treatment',
      title: 'Лечение болезни',
      focusedIcon: 'medical-bag',
      unfocusedIcon: 'medical-bag',
      url: 'https://medkort.ru/lk/profile?item=recommendations',
    },
    {
      key: 'wallet',
      title: 'Бонусная программа',
      focusedIcon: 'gift',
      unfocusedIcon: 'gift-outline',
      url: 'https://medkort.ru/lk/profile?item=wallet',
    },
  ];

  // Обработчик переключения вкладок
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex); // Устанавливаем текущую вкладку
    if (routes[newIndex].url) {
      setIsLoading(true); // Показываем индикатор загрузки
      setCurrentUrl(routes[newIndex].url); // Устанавливаем новый URL для вебвью
    }
  };

  // Компонент для отображения вебвью (сайт)
  const renderScene = () => (
    <View style={{ flex: 1 }}>
      {/* Показываем индикатор загрузки, пока сайт загружается */}
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={lightTheme.bottomBarActiveColor} />
        </View>
      )}
      {/* Само окно с сайтом */}
      <WebView
        source={{ uri: currentUrl }} // URL текущей вкладки
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)} // Начинаем загрузку
        onLoadEnd={() => setIsLoading(false)} // Заканчиваем загрузку
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Провайдер для стилей и тем */}
      <PaperProvider>
        {/* Устанавливаем цвет панели статуса */}
        <StatusBar barStyle="dark-content" backgroundColor={lightTheme.headerBackground} />

        {/* Шапка приложения */}
        <Appbar.Header style={[styles.header, { backgroundColor: lightTheme.headerBackground }]}>
          {/* Иконка уведомлений (слева) */}
          <Appbar.Action
            icon="bell" // Иконка колокольчика
            onPress={() => console.log('Уведомления')} // Пока выводит сообщение в консоль
            color={lightTheme.headerIconColor} // Цвет иконки черный
            size={28} // Размер иконки
          />
          {/* Название текущей вкладки */}
          <Text style={[styles.title, { color: lightTheme.headerIconColor }]}>
            {routes[index].title} {/* Название вкладки меняется в зависимости от выбора */}
          </Text>
          {/* Иконка настроек (справа) */}
          <TouchableOpacity onPress={() => console.log('Настройки')}>
            <Appbar.Action
              icon="cog" // Иконка шестеренки
              color={lightTheme.headerIconColor} // Цвет иконки черный
              size={28} // Размер иконки
            />
          </TouchableOpacity>
        </Appbar.Header>

        {/* Нижняя панель навигации */}
        <BottomNavigation
          navigationState={{ index, routes }} // Передаем текущую вкладку и маршруты
          onIndexChange={handleIndexChange} // Обработчик переключения вкладок
          renderScene={renderScene} // Отображаем вебвью
          barStyle={{ backgroundColor: lightTheme.bottomBarBackground }} // Фон нижней панели
          activeColor={lightTheme.bottomBarActiveColor} // Цвет активной кнопки
          inactiveColor={lightTheme.bottomBarInactiveColor} // Цвет неактивных кнопок
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
