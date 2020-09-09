import { ActionTree } from 'vuex';
import axios from 'axios';
import { LOGIN } from './mutations-types';
import { User, CredentialRequest, NewUser } from '~/app/types/user';
import UserService from '~/services/users.service';
import { Ls, userLocalStorage } from '~/app/utils/localStorage.ts';

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
    axios.defaults.headers.common.Authorization = `Token ${user.token}`;
    Ls.set(userLocalStorage, user);
  },
  [LOGIN.CHECK_OUT]: (state: UserState) => {
    Ls.remove(userLocalStorage);
    state.user = null;
    location.reload();
  },
};
export const actions: ActionTree<UserState, UserState> = {
  logIn: ({ commit }: any, credentias: CredentialRequest) => {
    return UserService.getUser(credentias).then((user: User) => {
      commit(LOGIN.CHECK_IN, user, true);
    });
  },
  resetPassword: (
    { commit }: any,
    obj: { password: string; token: string; email: string }
  ) => {
    return UserService.resetPassword(obj).then((user: User) => {
      commit(LOGIN.CHECK_IN, user, true);
    });
  },
  logOut: ({ commit }: any) => {
    commit(LOGIN.CHECK_OUT);
    return UserService.logOut();
  },
  signUp: ({ commit }: any, newUser: NewUser) => {
    return UserService.addUser(newUser).then((user: User) => {
      commit(LOGIN.CHECK_IN, user, true);
    });
  },
};

export interface UserState {
  user: User | null;
}
