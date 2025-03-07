import axios from 'axios';
import { ActionTree } from 'vuex';
import { LOGIN } from './mutations-types';
import { NewUser, User } from '~/app/types/user';
import UserService from '~/services/users.service';
import { Ls, userLocalStorage } from '~/app/utils/localStorage';

export const state = (): UserState => ({
  user: null,
});

export const getters = {
  getUser: (state: UserState) => state.user,
  getToken: (state: UserState) => state.user?.token,
  isLogedIn: (state: UserState) => !!state.user,
};

export const mutations = {
  [LOGIN.CHECK_IN]: (state: UserState, user: User) => {
    state.user = user;
    // axios.defaults.headers.common.Authorization = `Token ${user.token}`;
    // $auth.setUser(data);
    Ls.set(userLocalStorage, user);
  },
  [LOGIN.CHECK_OUT]: (state: UserState) => {
    Ls.remove(userLocalStorage);
    state.user = null;
    location.reload();
  },
};
export const actions: ActionTree<UserState, UserState> = {
  logIn: ({ commit }: any, user: User) => {
    commit(LOGIN.CHECK_IN, user, true);
  },
  resetPassword: ({ commit }: any, email: string) => {
    return UserService.resetPassword(email).then((user: User) => {
      commit(LOGIN.CHECK_IN, user, true);
    });
  },
  logOut: ({ commit }: any) => {
    commit(LOGIN.CHECK_OUT);
    return UserService.logOut();
  },
  signUp: ({ commit }: any, newUser: NewUser) => {
    return UserService.addUser(newUser).then((user: User) => {
      // console.log(user);
      if (user.response) {
        commit(LOGIN.CHECK_IN, user, true);
      } else {
        throw new Error(JSON.stringify({ ...user, status: 400 }));
      }
    });
  },
};

export interface UserState {
  user: User | null;
}
