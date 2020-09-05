import axios from 'axios';
import { Game, Condition, Prize } from '~/app/types/game';
import { Card } from '~/app/types/card';

export class GameService {
  private baseUrl = '/api/game';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async fetchGame(pin: string): Promise<Game> {
    const { data } = await axios.get<Promise<Game>>(
      `${this.baseUrl}/?pin=${pin}`,
      this.headers
    );
    return data;
  }

  public async getCard({
    cardId,
    gameId,
  }: {
    cardId: number;
    gameId: number;
  }): Promise<Card> {
    const { data } = await axios.post<Promise<Card>>(
      `${this.baseUrl}/card/`,
      { cardId, gameId },
      this.headers
    );
    return data;
  }

  public async createGame(gameToSet: {
    conditions: Condition[];
    prizes: Prize[];
  }): Promise<Game> {
    const { data } = await axios.post<Promise<Game>>(
      `${this.baseUrl}/public`,
      gameToSet,
      this.headers
    );
    return data;
  }
}

export const gameService = new GameService();
