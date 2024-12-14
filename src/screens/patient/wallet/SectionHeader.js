import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}
