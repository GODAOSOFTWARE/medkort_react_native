/**
 * BottomTabs.js
 * Компонент нижнего меню приложения.
 * Адаптивное отображение кнопок для ролей (пациент/врач).
 */

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { layoutStyles } from '../styles/styles.layout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Иконки Material Design

const BottomTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={layoutStyles.bottomTabs}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={layoutStyles.tabButton}
          onPress={() => onTabChange(tab)}
        >
          <Icon
            name={tab.icon}
            size={layoutStyles.tabIconSize}
            style={[
              layoutStyles.tabIcon,
              activeTab === tab && layoutStyles.activeTabIcon,
            ]}
          />
          <Text
            style={[
              layoutStyles.tabText,
              activeTab === tab && layoutStyles.activeTabText,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomTabs;
