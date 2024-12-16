/**
 * Путь: ./src/navigation/AppNavigator.js
 * 
 * Этот файл определяет универсальный навигатор.
 * Он строит нижнее меню и экраны на основе переданных маршрутов.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WebView from 'react-native-webview'; // Для WebView экранов
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Иконки для вкладок

const Tab = createBottomTabNavigator();

export default function AppNavigator({ routes }) {
  return (
    <Tab.Navigator>
      {routes.bottom.map(route => (
        <Tab.Screen
          key={route.key}
          name={route.title}
          component={
            route.component
              ? route.component // Если указан нативный компонент
              : () => <WebView source={{ uri: route.url }} /> // Если указан URL, открываем WebView
          }
          options={{
            tabBarIcon: () => <Icon name={route.icon} size={24} />, // Указываем иконку для вкладки
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
