import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { ActivityIndicator, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomNavigation, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { globalStyles, lightTheme, darkTheme } from './src/styles/globalStyles';

export default function App() {
  const systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [index, setIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md');
  const [isLoading, setIsLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Наши продукты');

  const routes = [
    { key: 'home', title: 'Медкорт AI Alpha 1.0', focusedIcon: 'home', unfocusedIcon: 'home-outline', url: 'https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md' },
    { key: 'appointments', title: 'Расписание приемов', focusedIcon: 'calendar', unfocusedIcon: 'calendar-outline', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
    { key: 'treatment', title: 'Планы лечения', focusedIcon: 'medical-bag', unfocusedIcon: 'medical-bag-outline', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
    { key: 'wallet', title: 'Бонусная программа', focusedIcon: 'gift', unfocusedIcon: 'gift-outline', url: 'https://medkort.ru/lk/profile?view=app&item=wallet' },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    setHeaderTitle(routes[newIndex].title);
    setIsLoading(true);
    setCurrentUrl(routes[newIndex].url);
  };

  const renderScene = () => (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View style={globalStyles.loader}>
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        </View>
      )}
      <WebView
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={currentTheme}>
        <StatusBar barStyle="dark-content" backgroundColor={currentTheme.colors.background} />
        <Appbar.Header style={[globalStyles.header, { backgroundColor: currentTheme.colors.background }]}>
          <Appbar.Action icon="account-circle" color={currentTheme.colors.text} size={30} />
          <Text style={[globalStyles.title, { color: currentTheme.colors.text }]}>{headerTitle}</Text>
          <TouchableOpacity>
            <Appbar.Action icon="cog" color={currentTheme.colors.text} size={30} />
          </TouchableOpacity>
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          barStyle={{ backgroundColor: currentTheme.colors.background }}
          activeColor={currentTheme.colors.primary}
          inactiveColor={currentTheme.colors.text}
          labeled={false}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
