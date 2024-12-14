/**
 * Файл: CallCenterNavigator.js
 *
 * Что содержит:
 * - Главный навигатор для колл-центра.
 * - Управляет шапкой (CallCenterHeader) и нижним меню (CallCenterBottom).
 *
 * За что отвечает:
 * - Объединяет шапку и нижнее меню колл-центра.
 * - Отображает WebView или экраны на основе маршрутов.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Routes } from './Routes'; // Центральный файл маршрутов
import { WebView } from 'react-native-webview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Навигатор для шапки колл-центра
 * Использует маршруты из Routes.callCenter.header
 */
function CallCenterHeader() {
  return (
    <Stack.Navigator>
      {Routes.callCenter.header.map((route) => (
        <Stack.Screen
          key={route.key}
          name={route.key}
          options={{ title: route.title }}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../screens/callcenter/${route.component}`).default
            )
          }
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * Навигатор для нижнего меню колл-центра
 * Использует маршруты из Routes.callCenter.main
 */
function CallCenterBottom() {
  return (
    <Tab.Navigator>
      {Routes.callCenter.main.map((route) => (
        <Tab.Screen
          key={route.key}
          name={route.key}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../screens/callcenter/${route.component}`).default
            )
          }
          options={{
            title: route.title,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={route.icon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

/**
 * Главный навигатор для колл-центра
 * Объединяет шапку (CallCenterHeader) и нижнее меню (CallCenterBottom)
 */
export default function CallCenterNavigator() {
  return (
    <>
      <CallCenterHeader /> {/* Подключение шапки */}
      <CallCenterBottom /> {/* Подключение нижнего меню */}
    </>
  );
}
