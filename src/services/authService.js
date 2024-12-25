import axios from 'axios';

const API_BASE_URL = 'https://medkort.ru/api'; // Базовый URL для API

const AuthService = {
  /**
   * Логин пользователя
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя
   * @returns {Promise<string>} - Токен авторизации
   */
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data?.access_token) {
        return response.data.access_token; // Возвращаем токен из ответа
      }

      throw new Error('Неверные данные авторизации');
    } catch (error) {
      console.error('Ошибка при авторизации:', error.message || error);
      throw new Error('Не удалось выполнить авторизацию');
    }
  },

  // Здесь можно добавить другие методы, такие как register, logout и т.д.
};

export default AuthService;
