import axios from 'axios';
import { User, CredentialRequest, NewUser } from '~/app/types/user';

class UserService {
  private baseUrl = 'api';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async getUser(credentias: CredentialRequest): Promise<User> {
    const { data } = await axios.post<Promise<User>>(
      `${this.baseUrl}/login`,
      credentias,
      this.headers
    );
    return {
      ...data,
    };
  }

  public async addUser(newUser: NewUser): Promise<User> {
    const serilizeObj = {
      // Maybe need to fit BE parmas
      ...newUser,
    };
    const { data } = await axios.post<Promise<User>>(
      `${this.baseUrl}/register`,
      serilizeObj
    );
    return {
      ...data,
    };
  }

  public async resetPassword(email: string): Promise<boolean> {
    const { data } = await axios.post(`${this.baseUrl}/resetPassword`, {
      email,
    });
    return !!data;
  }
}

export default new UserService();
