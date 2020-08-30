import { ActionContext, ActionTree } from 'vuex';
import axios from 'axios';
import { LOGIN } from './mutations-types';
import { User, CredentialRequest, NewUser } from '~/app/types/user';
import UserService from '~/services/users.services';
import { Ls, userLocalStorage } from '~/app/utils/localStorage.ts';

export const state = (): UserState => ({
  user: null,
});

export const getters = {
  getUser: (state: UserState) => state.user,
  isLogedIn: (state: UserState) => !!state.user,
};

export const mutations = {
  [LOGIN.CHECK_IN]: (state: UserState, user: User, remmberMe: boolean) => {
    state.user = user;
    axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    if (remmberMe) {
      Ls.set(userLocalStorage, user);
    }
  },
  [LOGIN.CHECK_OUT]: (state: UserState) => {
    Ls.remove(userLocalStorage);
    state.user = null;
    location.reload();
  },
};
export const actions: ActionTree<UserState, UserState> = {
  logIn: (
    { commit }: ActionContext<UserState, UserState>,
    credentias: CredentialRequest
  ) => {
    return UserService.getUser(credentias).then((user: User) => {
      commit(LOGIN.CHECK_IN, user);
    });
  },
  logOut: ({ commit }: any) => {
    commit(LOGIN.CHECK_OUT);
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
