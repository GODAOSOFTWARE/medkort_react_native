import React, { useState } from 'react';
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

export default function App() {
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('https://medkort.ru/lk/profile');
  const bottomSheetRef = React.useRef(null);

  const routes = [
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
      unfocusedIcon: 'medical-bag-outline',
      url: 'https://medkort.ru/lk/profile?item=recommendations',
    },
    {
      key: 'more',
      title: 'Еще',
      focusedIcon: 'dots-horizontal',
      unfocusedIcon: 'dots-horizontal',
    },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (routes[newIndex].url) {
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
      <WebView
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
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
});
