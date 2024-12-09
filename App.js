import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import BottomSheet from '@gorhom/bottom-sheet';

// Темы приложения
const lightTheme = {
  headerBackground: '#FFFFFF',
  headerIconColor: '#000000',
  bottomBarBackground: '#FFFFFF',
  bottomBarActiveColor: '#000000',
  bottomBarInactiveColor: '#A6A6A6',
};

const darkTheme = {
  headerBackground: '#000000',
  headerIconColor: '#FFFFFF',
  bottomBarBackground: '#000000',
  bottomBarActiveColor: '#FFFFFF',
  bottomBarInactiveColor: '#A6A6A6',
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('https://medkort.ru');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Переключение темы
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const routes = [
    {
      key: 'home',
      title: 'Главная',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
      url: 'https://medkort.ru',
    },
    {
      key: 'appointments',
      title: 'Приемы',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
      url: 'https://medkort.ru/lk/profile?item=appointments',
    },
    {
      key: 'treatment',
      title: 'Лечение',
      focusedIcon: 'medical-bag',
      unfocusedIcon: 'medical-bag',
      url: 'https://medkort.ru/lk/profile?item=recommendations',
    },
    {
      key: 'wallet',
      title: 'Кошелек',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
      url: 'https://medkort.ru/lk/profile?item=wallet',
    },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (routes[newIndex].url) {
      setIsLoading(true);
      setCurrentUrl(routes[newIndex].url);
    }
  };

  const renderScene = () => (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.bottomBarActiveColor} />
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
        <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} backgroundColor={theme.headerBackground} />
        {/* Шапка */}
        <Appbar.Header style={[styles.header, { backgroundColor: theme.headerBackground }]}>
          {/* Логотип */}
          <Appbar.Action
            icon="account-circle"
            onPress={() => console.log('Профиль')}
            color={theme.headerIconColor}
            size={28}
          />
          <Text style={[styles.title, { color: theme.headerIconColor }]}>Медкорт</Text>
          {/* Переключение темы */}
          <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
            <Appbar.Action
              icon={isDarkTheme ? 'weather-sunny' : 'weather-night'}
              color={theme.headerIconColor}
              size={28}
            />
          </TouchableOpacity>
        </Appbar.Header>

        {/* Основной контент */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          barStyle={{ backgroundColor: theme.bottomBarBackground }}
          activeColor={theme.bottomBarActiveColor}
          inactiveColor={theme.bottomBarInactiveColor}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
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
