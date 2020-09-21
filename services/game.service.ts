import axios from 'axios';
import { Card } from '~/app/types/card';
import { Game, JoinGameRes, Prize } from '~/app/types/game';
import { GameToSet } from '~/store/game';

export class GameService {
  // private proxy =
  //   process.env.NODE_ENV === 'production' ? process.env.serverUrl : '';
  private proxy = ``;
  private baseUrl = this.proxy + '/api/game';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async gameConfirm(pin: number): Promise<string> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/game-confirm/`,
        { game_id: pin },
        this.headers
      );
      const res: string = (await data.response) ? data.response : '';
      // can return 'not enough balance' || 'Game started'
      return res;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }

  public async gameRequest(
    pin: number,
    playersApproved: any[]
  ): Promise<{ gameCost: number; numOfPlayers: number }> {
    try {
      const { data } = await axios.post(
        `${this.baseUrl}/game-request/`,
        { game_id: pin, players_approved: playersApproved },
        this.headers
      );
      const res = await data;
      return {
        ...res,
        gameCost: +res.game_cost,
        numOfPlayers: +res.num_of_players,
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

  public async fetchGame(pin: string): Promise<Game> {
    try {
      const { data } = await axios.get<Promise<Game>>(
        `${this.baseUrl}/game-info/?game_id=${pin}`,
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
        `${this.baseUrl}/game-create/`,
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

  public async nextBall(gameId: number): Promise<any> {
    try {
      const { data } = await axios.get(
        `${this.baseUrl}/game-play/?game_id=${gameId}`,
        this.headers
      );
      return data;
    } catch (error) {}
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
      pin: +game.game_id,
      conditions: game.winning_conditions,
      hostId: game.user_id,
      album: game.album_id,
      prizes,
      picturesPool: game.pictures_pool || [],
      picturesList: game.players_list || [],
      shownPictures: game.shown_pictures || [],
      // bingo: any,
    };
  }

  public async gameWinnings(boardId: number, pin: number): Promise<string[]> {
    try {
      const { data } = await axios.get<Promise<any>>(
        `${this.baseUrl}/game-winnings/?board_id=${boardId}&game_id=${pin}
      `,
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

  private toServerObj(game: GameToSet) {
    const prizes: any = {};
    game.prizes.forEach((prize) => {
      prizes[`condition_${prize.conditionId}`] = prize;
    });

    return {
      album_name: game.album.name,
      album_id: game.album.albumId,
      board_size: game.conditions[0].row,
      winning_conditions: game.conditions.map(
        (condition) => condition.serverName
      ), // connert to array
      is_public: game.isPublic,
      prizes,
    };
  }
}

export const gameService = new GameService();
