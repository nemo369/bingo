import axios from 'axios';
import { User, CredentialRequest, NewUser } from '~/app/types/user';

class UserService {
  // private proxy =
  //   process.env.NODE_ENV === 'production' ? process.env.serverUrl : '';
  private proxy = ``;

  private baseUrl = this.proxy + '/api/users';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async getUser(credentias: CredentialRequest): Promise<User> {
    try {
      const { data } = await axios.post<Promise<User>>(
        `${this.baseUrl}/login/`,
        {
          username: credentias.email,
          ...credentias,
        },
        this.headers
      );

      return data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async addUser(newUser: NewUser): Promise<User> {
    const serilizeObj = {
      // Maybe need to fit BE parmas
      username: newUser.email,
      password1: newUser.password,
      password2: newUser.password,
      ...newUser,
    };
    try {
      const { data } = await axios.post<Promise<User>>(
        `${this.baseUrl}/register/`,
        serilizeObj
      );
      return {
        ...data,
      };
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async newPassword(newPasswords: {
    password1: string;
    password2: string;
    token: string;
    uid: string;
  }): Promise<User> {
    try {
      axios.defaults.headers.common.Authorization = `Token ${newPasswords.token}`;
      const { data } = await axios.post(
        `${this.baseUrl}/password_reset/`,
        newPasswords
      );
      return data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async resetPassword(email: string): Promise<User> {
    try {
      delete axios.defaults.headers.common.Authorization;
      const { data } = await axios.post(`${this.baseUrl}/password_reset/`, {
        email,
      });
      return data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async logOut() {
    const { data } = await axios.post(`${this.baseUrl}/logout/`, {});
    return data;
  }
}

export default new UserService();
