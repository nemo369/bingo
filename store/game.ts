import { ActionTree } from 'vuex';
import { GAME } from './mutations-types';
import { Game, Prize } from '~/app/types/game';
import { Condition } from '~/app/const/conditions';
import { gameService } from '~/services/game.service';

export const state = (): GameState => ({
  game: null,
});

export const getters = {
  getGame: (state: GameState) => state.game,
};

export const mutations = {
  [GAME.SET_GAME]: (state: GameState, game: Game) => (state.game = { ...game }),
};
export const actions: ActionTree<GameState, GameState> = {
  trySetGame: (
    { commit }: any,
    { conditions, prizes }: { conditions: Condition[]; prizes: Prize[] }
  ) => {
    return gameService.createGame().then((game: Game) => {
      commit(GAME.SET_GAME, game);
    });
  },
};

export interface GameState {
  game: Game;
}
