// Импорт необходимых модулей и компонентов
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen'; // Экран авторизации
import PinSetupScreen from '../screens/auth/PinSetupScreen'; // Экран установки PIN-кода
import PinConfirmScreen from '../screens/auth/PinConfirmScreen'; // Экран подтверждения PIN-кода
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'; // Экран приветствия
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen'; // Экран выбора роли
import Welcome from '../screens/onboarding/WelcomeScreen'
import PatinetProfile from '../screens/patient/profile/ProfileScreen';
import AdminProfile from '../screens/admin/AdminDashboard';

// Создаём стек навигации
const Stack = createStackNavigator();

// Функция навигатора
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     
     {/* Главный экран */}
     <Stack.Screen name="Welcome" component={Welcome} />
     
      {/* Экран авторизации */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Экран установки PIN-кода */}
      <Stack.Screen name="PinSetup" component={PinSetupScreen} />
      
      {/* Экран подтверждения PIN-кода */}
      <Stack.Screen name="PinConfirm" component={PinConfirmScreen} />
      
      {/* Экран приветствия */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      
      {/* Экран выбора роли */}
      <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />

      {/* Переход в кабинет пациента */}
      <Stack.Screen name="PatinetProfile" component={PatinetProfile} />

      {/* Переход в кабинет Админа */}
      <Stack.Screen name="AdminProfile" component={AdminProfile} />



      
    </Stack.Navigator>
  );
}
