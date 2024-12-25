import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  /**
   * Сохранить значение в AsyncStorage
   * @param {string} key - Ключ для сохранения
   * @param {string} value - Значение для сохранения
   * @returns {Promise<void>}
   */
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Данные "${key}" успешно сохранены`);
    } catch (error) {
      console.error(`Ошибка сохранения данных "${key}":`, error);
      throw new Error('Ошибка сохранения данных');
    }
  },

  /**
   * Получить значение из AsyncStorage
   * @param {string} key - Ключ для получения данных
   * @returns {Promise<string | null>} - Значение или null, если ключ не найден
   */
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(`Данные "${key}" успешно получены:`, value);
      return value;
    } catch (error) {
      console.error(`Ошибка получения данных "${key}":`, error);
      throw new Error('Ошибка получения данных');
    }
  },

  /**
   * Удалить значение из AsyncStorage
   * @param {string} key - Ключ для удаления
   * @returns {Promise<void>}
   */
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Данные "${key}" успешно удалены`);
    } catch (error) {
      console.error(`Ошибка удаления данных "${key}":`, error);
      throw new Error('Ошибка удаления данных');
    }
  },
};

export default StorageService;
