import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoleSelectionScreen({ route, navigation }) {
  const { options } = route.params;

  // Обработчик выбора роли
  const handleRoleSelect = (roleKey) => {
    console.log(`Выбрано: ${roleKey}`);
    navigation.navigate('RoleBasedScreen', { roleKey });
  };

  // Сброс токена и переход на WelcomeScreen
  const handleDisconnect = async () => {
    try {
      console.log("Disconnecting and resetting navigation...");
      navigation.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }],
      });
    } catch (error) {
      console.error('Ошибка при отключении:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>ВЫБЕРИТЕ ЛИЧНЫЙ КАБИНЕТ</Text>

      
      {/* Основной текст */}
      <Text style={styles.mainText}>и нужные Вам функции</Text>

      {/* Карточки ролей */}
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={[styles.cardContainer, { backgroundColor: '#FFFFFF' }]}
          onPress={() => handleRoleSelect(option.key)}
        >
          <Text style={styles.cardText}>{option.label}</Text>
          <MaterialCommunityIcons
            name={option.icon || 'account-circle'} // Иконка из параметра или стандартная
            size={28}
            color={option.color || '#3D54DA'} // Цвет иконки из параметра или стандартный
            style={styles.icon}
          />
        </TouchableOpacity>
      ))}

      {/* Кнопка Disconnect */}
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: '#FFEBEE' }]}
        onPress={handleDisconnect}
      >
        <Text style={[styles.cardText, { color: '#D32F2F' }]}>Назад</Text>
        <MaterialCommunityIcons
          name="logout"
          size={28}
          color="#D32F2F"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Сноска */}
      <Text style={styles.footer}>
        By continuing I agree with{' '}
        <Text style={styles.link}>Terms & conditions</Text>,{' '}
        <Text style={styles.link}>Privacy policy</Text>,{' '}
        <Text style={styles.link}>Cookie policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA', // Светлый фон
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333', // Тёмный текст
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666', // Светло-серый текст
    textAlign: 'center',
    marginBottom: 20,
  },
  mainText: {
    fontSize: 20,
    color: '#333333', // Тёмный текст
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3, // Material Design тень
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Тёмный текст
  },
  icon: {
    marginLeft: 10,
  },
  footer: {
    fontSize: 12,
    color: '#666666', // Светло-серый текст
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FFA726', // Оранжевый цвет ссылок
    fontWeight: 'bold',
  },
});
