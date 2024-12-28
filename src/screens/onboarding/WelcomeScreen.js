import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSizes } from '../../styles/styles.responsive';

export default function WelcomeScreen({ navigation }) {
  // Добавляем useEffect для логов при загрузке
  useEffect(() => {
    console.log(`Экран: WelcomeScreen`);
    console.log(`Стиль экрана: ${responsiveSizes.padding.large}px`);
  }, []);

  const handleStart = () => {
    // Действие при нажатии на кнопку
    navigation.navigate('NextScreen'); // Замените 'NextScreen' на реальное имя следующего экрана
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      {/* Верхняя часть */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="hospital-box" size={120} color="#FFFFFF" />
        <Text style={styles.title}>Welcome to Codefinity</Text>
        <Text style={styles.subtitle}>
          Just a few quick questions so we create the learning track for you
        </Text>
      </View>

      {/* Нижняя часть */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          By continuing I agree with{' '}
          <Text style={styles.link}>Terms & conditions</Text>,{' '}
          <Text style={styles.link}>Privacy policy</Text>,{' '}
          <Text style={styles.link}>Cookie policy</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E3C72',
    paddingHorizontal: responsiveSizes.padding.large,
    paddingVertical: responsiveSizes.padding.medium,
  },
  iconContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: responsiveSizes.text.large,
    marginTop: responsiveSizes.margin.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: responsiveSizes.text.medium,
    marginTop: responsiveSizes.margin.small,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: responsiveSizes.padding.medium,
  },
  startButton: {
    backgroundColor: '#FFA500',
    width: '100%',
    paddingVertical: responsiveSizes.padding.medium,
    borderRadius: responsiveSizes.margin.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveSizes.margin.medium,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: responsiveSizes.text.medium,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#E0E0E0',
    fontSize: responsiveSizes.text.small,
    textAlign: 'center',
  },
  link: {
    color: '#FFA500',
    textDecorationLine: 'underline',
  },
});
