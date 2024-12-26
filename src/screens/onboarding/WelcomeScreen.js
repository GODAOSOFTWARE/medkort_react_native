import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WelcomeScreen() {
  const [progress, setProgress] = useState(0);
  const scaleValue = new Animated.Value(1); // Для анимации сердца

  // Анимация сердца
  useEffect(() => {
    const animateHeart = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3, // Увеличение сердца
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Возврат к нормальному размеру
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animateHeart());
    };

    animateHeart();
  }, [scaleValue]);

  // Лоадер
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Увеличение на 2% каждые 100 мс
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={['#187bcd', '#4e9af1']}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <MaterialCommunityIcons name="heart" size={100} color="red" />
        </Animated.View>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Text style={styles.subtitle}>Идет загрузка приложения...</Text>
      </View>
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>{`${progress.toFixed(1)} %`}</Text>
        <View style={styles.loader}>
          <View style={[styles.loaderProgress, { width: `${progress}%` }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  loader: {
    width: '80%',
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  loaderProgress: {
    height: '100%',
    backgroundColor: 'red',
  },
});
