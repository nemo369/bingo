import axios from 'axios';
import { Card } from '~/app/types/card';
import { Game, JoinGameRes, Prize } from '~/app/types/game';
import { GameToSet } from '~/store/game';

export class GameService {
  private proxy =
    process.env.NODE_ENV === 'production' ? process.env.serverUrl : '';

  private baseUrl = this.proxy + '/api/game';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async fetchGame(pin: string): Promise<Game> {
    const { data } = await axios.get<Promise<Game>>(
      `${this.baseUrl}/?pin=${pin}/`,
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

  public async createGame(gameToSet: GameToSet): Promise<Game> {
    const gameToSetServerObj = this.toServerObj(gameToSet);
    try {
      const { data } = await axios.post<Promise<any>>(
        `${this.baseUrl}/game-ready/`,
        gameToSetServerObj,
        this.headers
      );
      const game = await this.serverToGame(data);
      return game;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async joinGame(pinAndName: {
    pin: number;
    name: string;
  }): Promise<JoinGameRes> {
    const { data } = await axios.post<Promise<JoinGameRes>>(
      `${this.baseUrl}/join/`,
      pinAndName,
      this.headers
    );
    return data;
  }

  private serverToGame(game: any): Game {
    const prizes: Prize[] = [];
    if (game.prizes[0]) {
      Object.keys(game.prizes[0]).forEach((key) => {
        prizes.push({
          ...game.prizes[0][key],
          conditionId: key,
        });
      });
    }

    return {
      ...game,
      pin: game.game_id,
      conditions: game.winning_conditions,
      hostId: game.user_id,
      album: game.album_id,
      prizes,
      // bingo: any,
    };
  }

  private toServerObj(game: GameToSet) {
    const prizes: any = {};
    game.prizes.forEach((prize) => {
      prizes[`condition_${prize.conditionId}`] = prize;
    });

    return {
      album_name: game.album.name,
      album_id: game.album.albumId,
      board_size: game.conditions[0].row,
      winning_conditions: game.conditions[0].serverName, // connert to array
      is_public: game.isPublic,
      prizes,
    };
  }
}

export const gameService = new GameService();
