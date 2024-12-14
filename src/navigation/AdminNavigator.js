/**
 * Файл: AdminNavigator.js
 *
 * Что содержит:
 * - Главный навигатор для администратора.
 * - Управляет шапкой (AdminHeader) и нижним меню (AdminBottom).
 *
 * За что отвечает:
 * - Объединяет шапку и нижнее меню администратора.
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
 * Навигатор для шапки администратора
 * Использует маршруты из Routes.admin.header
 */
function AdminHeader() {
  return (
    <Stack.Navigator>
      {Routes.admin.header.map((route) => (
        <Stack.Screen
          key={route.key}
          name={route.key}
          options={{ title: route.title }}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../screens/admin/${route.component}`).default
            )
          }
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * Навигатор для нижнего меню администратора
 * Использует маршруты из Routes.admin.main
 */
function AdminBottom() {
  return (
    <Tab.Navigator>
      {Routes.admin.main.map((route) => (
        <Tab.Screen
          key={route.key}
          name={route.key}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../screens/admin/${route.component}`).default
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
 * Главный навигатор для администратора
 * Объединяет шапку (AdminHeader) и нижнее меню (AdminBottom)
 */
export default function AdminNavigator() {
  return (
    <>
      <AdminHeader /> {/* Подключение шапки */}
      <AdminBottom /> {/* Подключение нижнего меню */}
    </>
  );
}
