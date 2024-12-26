import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StorageService from '../services/storageService';
import userService from '../services/userService';
import RoleSelectionScreen from '../screens/welcome/RoleSelectionScreen';
import ProductsScreen from '../screens/patient/ProductsScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      console.log('RootNavigator: Начало проверки роли'); // Логирование
      try {
        // Получаем токен из локального хранилища
        const token = await StorageService.getItem('authToken');
        console.log('RootNavigator: Токен из хранилища:', token);

        if (!token) {
          console.log('RootNavigator: Токен отсутствует, переход на AuthNavigator');
          setRoutes('AuthNavigator');
          return;
        }

        // Делаем запрос через userService
        const userData = await userService.getUser(token);
        console.log('RootNavigator: Данные пользователя из API:', userData);

        const roleId = userData?.data?.role?.id;

        if (roleId === 0) {
          console.log('RootNavigator: Пользователь - пациент');
          setRoutes('Routes.patient');
        } else if (roleId === 5) {
          console.log('RootNavigator: Пользователь - врач, переход на RoleSelectionScreen');
          setRoutes('RoleSelectionScreen');
        } else {
          console.log('RootNavigator: Неизвестная роль, переход на AuthNavigator');
          setRoutes('AuthNavigator');
        }
      } catch (error) {
        console.error('RootNavigator: Ошибка при проверке роли:', error);
        setRoutes('AuthNavigator');
      }
    };

    checkRole();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {routes === 'Routes.patient' && <Stack.Screen name="Products" component={ProductsScreen} />}
        {routes === 'RoleSelectionScreen' && (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        )}
        {routes === 'AuthNavigator' && <Stack.Screen name="Auth" component={AuthNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
