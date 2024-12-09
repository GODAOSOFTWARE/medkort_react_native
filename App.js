import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, MD3LightTheme as DefaultTheme, Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import BottomSheet from '@gorhom/bottom-sheet';

// Настраиваем тему
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#A6A6A6', // Цвет полукруглого индикатора (серый)
  },
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('https://medkort.ru/lk/profile');
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const bottomSheetRef = React.useRef(null);

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

  const renderScene = () => {
    if (routes[index].key === 'more') {
      return (
        <View style={styles.container}>
          <Text style={styles.text} onPress={() => bottomSheetRef.current?.expand()}>
            Открыть меню
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
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
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#0D161D" />
        {/* Шапка */}
        <Appbar.Header style={styles.header}>
          {/* Лого и текст Медкорт слева */}
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/36' }} 
              style={styles.logo} 
            />
            <Text style={styles.appbarTitle}>Медкорт</Text>
          </View>

          {/* Иконки справа */}
          <View style={styles.iconContainer}>
            <Appbar.Action
              icon="bell-outline"
              onPress={() => console.log('Уведомления')}
              size={28}
              iconColor="#FFFFFF"
            />
            <Appbar.Action
              icon="theme-light-dark"
              onPress={() => console.log('Тема интерфейса')}
              size={28}
              iconColor="#FFFFFF"
            />
            <Appbar.Action
              icon="cog-outline"
              onPress={() => console.log('Настройки')}
              size={28}
              iconColor="#FFFFFF"
            />
          </View>
        </Appbar.Header>

        {/* Основной контент */}
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          barStyle={styles.barStyle}
          activeColor="#FFFFFF"
          inactiveColor="#A6A6A6"
          labeled={true}
        />
        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['25%', '50%']}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.sheetOption}>Настройки безопасности</Text>
            <Text style={styles.sheetOption}>Бонусная программа</Text>
          </View>
        </BottomSheet>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0D161D', // Цвет шапки
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8, // Отступы для выравнивания
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18, // Круглое лого
    marginRight: 8, // Отступ между логотипом и текстом
  },
  appbarTitle: {
    color: '#FFFFFF', // Белый текст
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Значки прижаты к правому краю
    gap: 12, // Расстояние между значками
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 18,
    color: '#000000',
  },
  barStyle: {
    backgroundColor: '#000000',
  },
  bottomSheetBackground: {
    backgroundColor: '#1E1E1E',
  },
  bottomSheetContent: {
    padding: 16,
  },
  sheetOption: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 8,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Полупрозрачный фон для лоадера
    zIndex: 10,
  },
});
