import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import PinSetupScreen from '../screens/auth/PinSetupScreen';
import PinConfirmScreen from '../screens/auth/PinConfirmScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen'; // Импорт WelcomeScreen

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PinSetup" component={PinSetupScreen} />
      <Stack.Screen name="PinConfirm" component={PinConfirmScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
