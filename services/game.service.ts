import axios from 'axios';
import { Game } from '~/app/types/game';

export class GameService {
  private baseUrl = '/api/game';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async createGame(): Promise<Game> {
    const { data } = await axios.post<Promise<Game>>(
      `${this.baseUrl}/public`,
      this.headers
    );
    return data;
  }
}

export const gameService = new GameService();
