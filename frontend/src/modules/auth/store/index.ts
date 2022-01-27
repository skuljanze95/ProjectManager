import { Commit } from 'vuex';
import InterfaceLogin from '../interface/InterfaceLogin';
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user') as string);

interface CommitFunction {
  commit: Commit;
}

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export default {
  state: initialState,
  actions: {
    login({ commit }: CommitFunction, user: InterfaceLogin) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: CommitFunction) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }: CommitFunction, user: InterfaceLogin) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        (error) => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }: CommitFunction, accessToken: string) {
      commit('refreshToken', accessToken);
    },
  },
  mutations: {
    loginSuccess(
      state: { status: { loggedIn: boolean }; user: InterfaceLogin },
      user: InterfaceLogin
    ) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: { status: { loggedIn: boolean }; user: null }) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state: { status: { loggedIn: boolean }; user: null }) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state: { status: { loggedIn: boolean } }) {
      state.status.loggedIn = false;
    },
    registerFailure(state: { status: { loggedIn: boolean } }) {
      state.status.loggedIn = false;
    },
    refreshToken(
      state: { status: { loggedIn: boolean }; user: any },
      accessToken: string
    ) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
  },
};
