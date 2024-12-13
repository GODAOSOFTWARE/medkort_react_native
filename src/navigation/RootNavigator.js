import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/onboarding/WelcomeScreen'; 
import HomeScreen from '../screens/patient/HomeScreen'; 
// Если есть другие экраны, импортируйте их аналогично

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="WelcomeScreen" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* Добавляйте остальные скрины ниже */}
    </Stack.Navigator>
  );
}
