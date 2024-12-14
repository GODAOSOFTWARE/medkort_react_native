/**
 * Файл: DoctorNavigator.js
 *
 * Что содержит:
 * - Главный навигатор для врача.
 * - Управляет шапкой (DoctorHeader) и нижним меню (DoctorBottom).
 *
 * За что отвечает:
 * - Объединяет шапку и нижнее меню врача.
 * - Отображает WebView или экраны на основе маршрутов.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DoctorRoutes } from '../routes/DoctorRoutes';
import WalletScreen from '../../screens/doctor/WalletScreen';
import { WebView } from 'react-native-webview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Навигатор для шапки врача
 * Использует маршруты из DoctorRoutes.header
 */
function DoctorHeader() {
  return (
    <Stack.Navigator>
      {DoctorRoutes.header.map((route) => (
        <Stack.Screen
          key={route.key}
          name={route.key}
          options={{ title: route.title }}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex:1 }} />
            ) : (
              require(`../../screens/doctor/${route.component}`).default
            )
          }
        />
      ))}
    </Stack.Navigator>
  );
}

/**
 * Навигатор для нижнего меню врача
 * Использует маршруты из DoctorRoutes.bottom
 */
function DoctorBottom() {
  return (
    <Tab.Navigator>
      {DoctorRoutes.bottom.map((route) => (
        <Tab.Screen
          key={route.key}
          name={route.key}
          component={() =>
            route.url ? (
              <WebView source={{ uri: route.url }} style={{ flex:1 }} />
            ) : (
              require(`../../screens/doctor/${route.component}`).default
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
 * Главный навигатор для врача
 * Объединяет шапку (DoctorHeader) и нижнее меню (DoctorBottom)
 */
export default function DoctorNavigator() {
  return <DoctorBottom />; // Если нужна шапка, её можно подключить сюда
}
