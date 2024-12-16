/**
 * Этот файл определяет компонент `BottomTabs`, который отвечает за:
 * - Отображение нижней панели навигации.
 * - Обработку переходов между вкладками.
 * - Рендеринг контента в зависимости от выбранной вкладки: 
 *   - Экран кошелька для вкладки "wallet".
 *   - WebView для остальных вкладок.
 */

import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import WalletScreen from '../screens/patient/wallet/WalletScreen'; // Импортируем экран кошелька

export default function BottomTabs({ routes, index, onIndexChange, currentUrl, setCurrentUrl, setIsLoading, theme }) {
  // Определяет, какой контент рендерить в зависимости от выбранной вкладки
  const renderScene = () => {
    const routeKey = routes[index].key;

    if (routeKey === 'wallet') {
      // Рендерим экран кошелька
      return (
        <View style={{ flex: 1 }}>
          <WalletScreen />
        </View>
      );
    } else {
      // Рендерим WebView для остальных вкладок
      return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: currentUrl }}
            style={{ flex: 1 }}
            onLoadStart={() => setIsLoading(true)} // Включаем индикатор загрузки
            onLoadEnd={() => setIsLoading(false)} // Отключаем индикатор загрузки
          />
        </View>
      );
    }
  };

  // Отображает нижнюю панель навигации
  return (
    <BottomNavigation
      navigationState={{ index, routes }} // Состояние навигации
      onIndexChange={onIndexChange} // Обработчик переключения вкладок
      renderScene={renderScene} // Рендеринг контента для текущей вкладки
      barStyle={{ backgroundColor: theme.colors.background }} // Цвет нижней панели
      activeColor={theme.colors.primary} // Цвет активных иконок
      inactiveColor={theme.colors.text} // Цвет неактивных иконок
      labeled={false} // Убираем подписи у иконок
    />
  );
}
