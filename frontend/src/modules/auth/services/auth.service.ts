/* eslint-disable @typescript-eslint/no-explicit-any */
import InterfaceLogin from '../interface/InterfaceLogin';
import api from '@/services/api';
import TokenService from '@/modules/auth/services/token.service';

class AuthService {
  async login(payload: InterfaceLogin) {
    try {
      const response = await api.post('/auth/login', {
        username: payload.username,
        password: payload.password,
      });
      if (response.data.accessToken) TokenService.setUser(response.data);
    } catch (err: any) {
      console.error(err.response.data);
    }
  }

  logout() {
    TokenService.removeUser();
  }

  register(payload: InterfaceLogin) {
    return api.post('/auth/register', {
      payload,
    });
  }
}

export default new AuthService();
