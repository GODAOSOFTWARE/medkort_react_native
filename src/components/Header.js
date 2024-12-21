/**
 * Header.js
 * Компонент шапки приложения.
 * Отображает кнопки на основе маршрутов для ролей (пациент/врач).
 */

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { layoutStyles } from '../styles/styles.layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Иконки Material Design

const Header = ({ routes }) => {
  return (
    <View style={layoutStyles.header}>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={layoutStyles.headerButton}
          onPress={() => {
            if (route.url) {
              // Обработка перехода по URL
              window.location.href = route.url;
            }
          }}
        >
          {route.icon && (
            <Icon
              name={route.icon}
              size={layoutStyles.headerIconSize}
              style={layoutStyles.headerIcon}
            />
          )}
          <Text style={layoutStyles.headerButtonText}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Header;
