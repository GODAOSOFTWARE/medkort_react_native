import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Настраиваем тему
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#A6A6A6', // Цвет полукруглого индикатора (серый)
  },
};

const QuestionnaireRoute = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Это экран Анкеты</Text>
  </View>
);

const AppointmentsRoute = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Это экран Приемов</Text>
  </View>
);

const TreatmentRoute = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Это экран Лечения</Text>
  </View>
);

const MoreRoute = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Это экран "Еще"</Text>
  </View>
);

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'questionnaire',
      title: 'Анкета',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
    {
      key: 'appointments',
      title: 'Приемы',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'treatment',
      title: 'Лечение',
      focusedIcon: 'medical-bag',
      unfocusedIcon: 'medical-bag',
    },
    {
      key: 'more',
      title: 'Еще',
      focusedIcon: 'dots-horizontal',
      unfocusedIcon: 'dots-horizontal',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    questionnaire: QuestionnaireRoute,
    appointments: AppointmentsRoute,
    treatment: TreatmentRoute,
    more: MoreRoute,
  });

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.barStyle}
        activeColor="#FFFFFF" // Белый цвет активных элементов
        inactiveColor="#A6A6A6" // Светло-серый для неактивных элементов
        labeled={true} // Сохраняем видимые подписи
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5', // Светлый фон для экранов
  },
  text: {
    fontSize: 18,
    color: '#000000', // Чёрный текст
  },
  barStyle: {
    backgroundColor: '#000000', // Чёрный фон нижнего меню
  },
});
