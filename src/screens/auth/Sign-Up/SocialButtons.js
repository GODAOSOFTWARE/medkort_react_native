import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { buttonStyles } from '../../../styles/styles.buttons'; // Импорт стилей кнопок

export default function SocialButtons() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons.Button
        name="facebook"
        backgroundColor="#3b5998"
        style={buttonStyles.primary}
        onPress={() => console.log('Facebook')}
      >
        Facebook
      </MaterialCommunityIcons.Button>
      <MaterialCommunityIcons.Button
        name="apple"
        backgroundColor="#000000"
        style={buttonStyles.primary}
        onPress={() => console.log('Apple')}
      >
        Apple
      </MaterialCommunityIcons.Button>
      <MaterialCommunityIcons.Button
        name="google"
        backgroundColor="#db4a39"
        style={buttonStyles.primary}
        onPress={() => console.log('Google')}
      >
        Google
      </MaterialCommunityIcons.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
