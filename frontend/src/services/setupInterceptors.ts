import axiosInstance from './api';
import TokenService from '@/modules/auth/services/token.service';
import { Store } from 'vuex';
import router from '@/router';

const setup = (store: Store<any>) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken() || 'null';
      if (token) {
        config.headers = {
          'access-token': token,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== '/auth/signin' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post('/auth/refreshToken', {
              'refresh-token': TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            store.dispatch('refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            store.dispatch('logout');
            router.push('/login');
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
