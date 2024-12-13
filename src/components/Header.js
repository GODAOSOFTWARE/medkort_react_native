import React from 'react';
import { Appbar } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function Header({ title, theme }) {
  return (
    <Appbar.Header style={[globalStyles.header, { backgroundColor: theme.colors.background }]}>
      <Appbar.Action icon="account-circle" color={theme.colors.text} size={30} />
      <Text style={[globalStyles.title, { color: theme.colors.text }]}>{title}</Text>
      <TouchableOpacity>
        <Appbar.Action icon="cog" color={theme.colors.text} size={30} />
      </TouchableOpacity>
    </Appbar.Header>
  );
}
