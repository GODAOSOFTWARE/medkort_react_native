/**
 * Файл: AdminNavigator.js
 *
 * Что содержит:
 * - Главный навигатор для админа.
 * - Управляет шапкой (AdminHeader) и нижним меню (AdminBottom).
 *
 * За что отвечает:
 * - Объединяет шапку и нижнее меню админа.
 * - Отображает WebView или экраны на основе маршрутов.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminRoutes } from './routes/AdminRoutes';
import { WebView } from 'react-native-webview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Навигатор для шапки админа
 * Использует маршруты из AdminRoutes.header
 */
function AdminHeader() {
  return (
    <Stack.Navigator>
      {AdminRoutes.header.map((route) => (
        <Stack.Screen
          key={route.key}
          name={route.key}
          options={{ title: route.title }}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../../screens/admin/${route.component}`).default
            )
          }
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * Навигатор для нижнего меню админа
 * Использует маршруты из AdminRoutes.bottom
 */
function AdminBottom() {
  return (
    <Tab.Navigator>
      {AdminRoutes.bottom.map((route) => (
        <Tab.Screen
          key={route.key}
          name={route.key}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../../screens/admin/${route.component}`).default
            )
          }
          options={{
            title: route.title,
            tabBarIcon: ({ focused, color, size }) => (
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
 * Главный навигатор для админа
 * Объединяет шапку (AdminHeader) и нижнее меню (AdminBottom)
 */
export default function AdminNavigator() {
  return <AdminBottom />; // Если шапка не нужна, рендерится только меню
}
