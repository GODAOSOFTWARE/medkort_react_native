import axios from 'axios';

const BASE_URL = 'https://medkort.ru/api/v1';

export default {
  getUser: async (token) => {
    try {
      console.log('userService: Отправка запроса к API /user'); // Лог
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('userService: Ответ от API /user:', response.data); // Лог
      return response.data;
    } catch (error) {
      console.error('userService: Ошибка при запросе к API /user:', error);
      throw error;
    }
  },
};
