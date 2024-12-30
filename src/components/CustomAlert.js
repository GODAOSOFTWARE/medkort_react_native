import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomAlert = ({ visible, onClose, title, message, iconName, customStyles }) => {
  const slideAnim = useRef(new Animated.Value(0)).current; // Начальная позиция: скрытый

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1, // Показать
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0, // Скрыть
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        customStyles.alertContainer,
        { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] },
      ]}
    >
      <View style={customStyles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={50} color="#FFD700" />
      </View>
      <Text style={customStyles.title}>{title}</Text>
      <Text style={customStyles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={customStyles.button}>
        <Text style={customStyles.buttonText}>Закрыть</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomAlert;
