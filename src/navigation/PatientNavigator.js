/**
 * Файл: PatientNavigator.js
 *
 * Что содержит:
 * - Главный навигатор для пациента.
 * - Управляет шапкой (PatientHeader) и нижним меню (PatientBottom).
 *
 * За что отвечает:
 * - Объединяет шапку и нижнее меню пациента.
 * - Отображает WebView или экраны на основе маршрутов.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PatientRoutes } from './routes/PatientRoutes';
import WalletScreen from '../screens/patient/WalletScreen';
import { WebView } from 'react-native-webview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Навигатор для шапки пациента
 * Использует маршруты из PatientRoutes.header
 */
function PatientHeader() {
  return (
    <Stack.Navigator>
      {PatientRoutes.header.map((route) => (
        <Stack.Screen
          key={route.key}
          name={route.key}
          options={{ title: route.title }}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../../screens/patient/${route.component}`).default
            )
          }
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * Навигатор для нижнего меню пациента
 * Использует маршруты из PatientRoutes.bottom
 */
function PatientBottom() {
  return (
    <Tab.Navigator>
      {PatientRoutes.bottom.map((route) => (
        <Tab.Screen
          key={route.key}
          name={route.key}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex: 1 }} />
            ) : (
              require(`../../screens/patient/${route.component}`).default
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
 * Главный навигатор для пациента
 * Объединяет шапку (PatientHeader) и нижнее меню (PatientBottom)
 */
export default function PatientNavigator() {
  return <PatientBottom />; // Если шапка не нужна, рендерится только меню
}
