import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
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

// WebView для загрузки страниц
const WebViewScreen = ({ url }) => (
  <WebView source={{ uri: url }} style={{ flex: 1 }} />
);

// Экран "Еще"
const MoreScreen = ({ onOpenSheet }) => (
  <View style={styles.container}>
    <Text style={styles.text} onPress={onOpenSheet}>
      Открыть меню
    </Text>
  </View>
);

export default function App() {
  const [index, setIndex] = useState(0);
  const bottomSheetRef = useRef(null);

  const [routes] = useState([
    {
      key: 'questionnaire',
      title: 'Анкета',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
      url: 'https://medkort.ru/lk/profile',
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
      key: 'more',
      title: 'Еще',
      focusedIcon: 'dots-horizontal',
      unfocusedIcon: 'dots-horizontal',
    },
  ]);

  const renderScene = ({ route }) => {
    if (route.key === 'more') {
      return <MoreScreen onOpenSheet={() => bottomSheetRef.current?.expand()} />;
    }
    return <WebViewScreen url={route.url} />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={styles.barStyle}
          activeColor="#FFFFFF" // Белый цвет активных элементов
          inactiveColor="#A6A6A6" // Светло-серый для неактивных элементов
          labeled={true} // Сохраняем видимые подписи
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5', // Светлый фон для экранов
  },
  text: {
    fontSize: 18,
    color: '#000000', // Чёрный текст
  },
  barStyle: {
    backgroundColor: '#000000', // Чёрный фон нижнего меню
  },
  bottomSheetBackground: {
    backgroundColor: '#1E1E1E', // Чёрный фон для Bottom Sheet
  },
  bottomSheetContent: {
    padding: 16,
  },
  sheetOption: {
    fontSize: 16,
    color: '#FFFFFF', // Белый текст для элементов Bottom Sheet
    marginVertical: 8,
  },
});
