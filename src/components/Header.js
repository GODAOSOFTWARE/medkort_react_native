/**
 * Этот файл определяет компонент `Header`, который отвечает за:
 * - Отображение заголовка приложения.
 * - Отображение двух кнопок в шапке: 
 *   - Кнопка профиля слева.
 *   - Кнопка настроек справа.
 */

import React from 'react';
import { Appbar } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function Header({ title, theme }) {
  return (
    // Шапка приложения с заголовком и двумя кнопками
    <Appbar.Header style={[globalStyles.header, { backgroundColor: theme.colors.background }]}>
      {/* Кнопка профиля */}
      <Appbar.Action icon="account-circle" color={theme.colors.text} size={30} />

      {/* Заголовок */}
      <Text style={[globalStyles.title, { color: theme.colors.text }]}>{title}</Text>

      {/* Кнопка настроек */}
      <TouchableOpacity>
        <Appbar.Action icon="cog" color={theme.colors.text} size={30} />
      </TouchableOpacity>
    </Appbar.Header>
  );
}
