import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen'; // Экран авторизации
import PinSetupScreen from '../screens/auth/PinSetupScreen'; // Экран установки PIN-кода
import PinConfirmScreen from '../screens/auth/PinConfirmScreen'; // Экран подтверждения PIN-кода
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'; // Экран приветствия
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen'; // Экран выбора роли
import PatientProfile from '../screens/patient/profile/ProfileScreen'; // Кабинет пациента
import AdminProfile from '../screens/admin/AdminDashboard'; // Кабинет администратора
import DoctorProfile from '../screens/doctor/DoctorDashboard'; // Кабинет доктора
import PinEnterScreen from '../screens/auth/PinEnterScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PinEnterScreen" component={PinEnterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PinSetupScreen" component={PinSetupScreen} />
      <Stack.Screen name="PinConfirm" component={PinConfirmScreen} />
      <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
    </Stack.Navigator>
  );
}
