import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function BottomTabs({ routes, index, onIndexChange, currentUrl, setCurrentUrl, setIsLoading, theme }) {
  const renderScene = () => (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      // Добавляем тень согласно MD3
      barStyle={{
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      labeled={false}
    />
  );
}
