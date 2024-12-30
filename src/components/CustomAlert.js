import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomAlert = ({ visible, onClose, icon, title, message, buttonText }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Иконка */}
          {icon && <Image source={icon} style={styles.icon} />}

          {/* Заголовок */}
          <Text style={styles.title}>{title}</Text>

          {/* Сообщение */}
          <Text style={styles.message}>{message}</Text>

          {/* Кнопка */}
          <TouchableOpacity style={styles.buttonContainer} onPress={onClose}>
            <LinearGradient
              colors={['#1E3C72', '#2A5298']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемнение фона
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
