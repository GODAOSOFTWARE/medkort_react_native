import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';
import { layoutStyles } from '../styles/styles.layout';

const WebView = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { url } = route.params; // Получаем URL из параметров маршрута

  return (
    <View style={layoutStyles.container}>
      {/* Индикатор загрузки */}
      {isLoading && (
        <View style={layoutStyles.loader}>
          <ActivityIndicator size="large" color="#3D54DA" />
        </View>
      )}
      {/* Компонент WebView */}
      <RNWebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)} // Начало загрузки
        onLoadEnd={() => setIsLoading(false)} // Конец загрузки
      />
    </View>
  );
};

export default WebView;
