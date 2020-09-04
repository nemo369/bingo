import { ActionTree } from 'vuex';
import { GAME } from './mutations-types';
import { Game, Prize, Condition } from '~/app/types/game';
import { gameService } from '~/services/game.service';
import { Picture } from '~/app/types/album';

export const state = (): GameState => ({
  game: undefined,
  ballsInMachine: [],
  ballsPicked: [],
  drawnBall: null,
});

export const getters = {
  getGame: (state: GameState) => state.game,
  getBallsInMachine: (state: GameState) => state.ballsInMachine,
  getBallsPicked: (state: GameState) => state.ballsPicked,
  getDrawnBall: (state: GameState) => state.drawnBall,
};

export const mutations = {
  [GAME.SET_GAME]: (state: GameState, game: Game) => (state.game = { ...game }),
  [GAME.RESET_GAME]: (state: GameState) => {
    state.drawnBall = null;
    state.ballsPicked = [];
    state.ballsInMachine = state.game ? [...state.game.album.pictures] : [];
  },
};
export const actions: ActionTree<GameState, GameState> = {
  trySetGame: (
    { commit }: any,
    gameToset: { conditions: Condition[]; prizes: Prize[] }
  ) => {
    return gameService.createGame(gameToset).then((game: Game) => {
      commit(GAME.SET_GAME, game);
    });
  },
  fetchGame: ({ commit }: any, pin: string) => {
    return gameService.fetchGame(pin).then((game: Game) => {
      commit(GAME.SET_GAME, game);
    });
  },
  resetGame: ({ commit }: any) => {
    commit(GAME.RESET_GAME);
  },
};

export interface GameState {
  game?: Game;
  ballsPicked: Picture[];
  ballsInMachine: Picture[];
  drawnBall: Picture | null;
}
