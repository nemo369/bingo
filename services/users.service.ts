import axios from 'axios';
import { User, CredentialRequest, NewUser } from '~/app/types/user';

class UserService {
  private baseUrl = process.env.serverUrl + 'api/users';
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

  public async resetPassword({
    password,
    token,
    email,
  }: {
    password: string;
    token: string;
    email: string;
  }): Promise<User> {
    try {
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      const { data } = await axios.post(`${this.baseUrl}/password_reset/`, {
        password1: password,
        password2: password,
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
