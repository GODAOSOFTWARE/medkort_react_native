import apiClient from './apiClient';

const userService = {
  getUser: async () => {
    return apiClient('user', 'GET');
  },
};

export default userService;
