import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { globalStyles } from '../styles/globalStyles';

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
      barStyle={{ backgroundColor: theme.colors.background }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.text}
      labeled={false}
    />
  );
}
