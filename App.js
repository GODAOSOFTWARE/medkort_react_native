import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './src/components/Header';
import BottomTabs from './src/components/BottomTabs';
import { globalStyles, lightTheme, darkTheme } from './src/styles/globalStyles';



export default function App() {
  const systemTheme = useColorScheme();
  const [currentTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [index, setIndex] = useState(0);
  const [headerTitle, setHeaderTitle] = useState('Наши продукты');
  const [currentUrl, setCurrentUrl] = useState('https://github.com/GODAOSOFTWARE/medkort_react_native/blob/main/README.md');
  const [isLoading, setIsLoading] = useState(false);

  const routes = [
    { key: 'home', title: 'Продукты', focusedIcon: 'home', unfocusedIcon: 'home', url: 'https://medkort.ru' },
    { key: 'appointments', title: 'Расписание', focusedIcon: 'calendar', unfocusedIcon: 'calendar', url: 'https://medkort.ru/lk/profile?view=app&item=appointments' },
    { key: 'treatment', title: 'Лечение', focusedIcon: 'medical-bag', unfocusedIcon: 'medical-bag', url: 'https://medkort.ru/lk/profile?view=app&item=recommendations' },
    { key: 'wallet', title: 'Кошелек', focusedIcon: 'gift', unfocusedIcon: 'gift',},
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    setHeaderTitle(routes[newIndex].title);
    setIsLoading(true);
    setCurrentUrl(routes[newIndex].url);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={currentTheme}>
        <Header title={headerTitle} theme={currentTheme} />
        <BottomTabs
          routes={routes}
          index={index}
          onIndexChange={handleIndexChange}
          currentUrl={currentUrl}
          setCurrentUrl={setCurrentUrl}
          setIsLoading={setIsLoading}
          theme={currentTheme}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}