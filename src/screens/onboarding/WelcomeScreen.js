import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveSizes, getSizeCategory } from '../../styles/styles.responsive';

export default function WelcomeScreen({ navigation }) {
  const [sizeCategory, setSizeCategory] = useState('');

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    const category = getSizeCategory();

    setSizeCategory(category);

    console.log(`Экран: WelcomeScreen`);
    console.log(`Размер экрана: ширина - ${width}px, высота - ${height}px`);
    console.log(`Определена категория экрана: ${category}`);
    console.log(`Присвоенный символ: ${category === 'small' ? '📱' : category === 'medium' ? '📲' : '💻'}`);
  }, []);

  const handleStart = () => {
    navigation.navigate('NextScreen'); // Замените 'NextScreen' на реальное имя следующего экрана
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      {/* Верхняя часть */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="hospital-box" size={120} color="#FFFFFF" />
        <Text style={[styles.title, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Welcome to Codefinity
        </Text>
        <Text style={[styles.subtitle, { fontSize: responsiveSizes.text[sizeCategory] }]}>
          Just a few quick questions so we create the learning track for you
        </Text>
      </View>

      {/* Нижняя часть */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.startButton, { paddingVertical: responsiveSizes.button[sizeCategory] }]} onPress={handleStart}>
          <Text style={[styles.startButtonText, { fontSize: responsiveSizes.text[sizeCategory] }]}>
            Start
          </Text>
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
    marginTop: responsiveSizes.margin.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0E0E0',
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
    borderRadius: responsiveSizes.margin.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveSizes.margin.medium,
  },
  startButtonText: {
    color: '#FFFFFF',
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
