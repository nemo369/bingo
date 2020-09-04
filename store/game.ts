import { ActionTree } from 'vuex';
import { GAME } from './mutations-types';
import { Game, Prize, Condition } from '~/app/types/game';
import { gameService } from '~/services/game.service';
import { Picture } from '~/app/types/album';
import { shuffleArray } from '~/app/utils/helpers';

export const state = (): GameState => ({
  game: undefined,
  gameStatus: {
    ballsInMachine: [],
    ballsPicked: [],
    drawnBall: null,
  },
});

export const getters = {
  getGame: (state: GameState) => state.game,
  getBallsInMachine: (state: GameState) => state.gameStatus.ballsInMachine,
  getBallsPicked: (state: GameState) => state.gameStatus.ballsPicked,
  getDrawnBall: (state: GameState) => state.gameStatus.drawnBall,
  getGameStatus: (state: GameState) => state.gameStatus,
};

export const mutations = {
  [GAME.SET_GAME]: (state: GameState, game: Game) => (state.game = { ...game }),
  [GAME.RESET_GAME]: (state: GameState) => {
    state.gameStatus.drawnBall = null;
    state.gameStatus.ballsPicked = [];
    state.gameStatus.ballsInMachine = state.game
      ? shuffleArray(state.game.album.pictures)
      : [];
  },
  [GAME.DRAW_A_BALL]: (state: GameState) => {
    const { ballsPicked, ballsInMachine } = state.gameStatus;
    const newBallsInMachine = ballsInMachine.filter((ball, i) =>
      i ? ball : null
    );
    const newStatus: GameStatus = {
      ballsPicked: [...ballsPicked, ballsInMachine[0]],
      drawnBall: ballsInMachine[0],
      ballsInMachine: newBallsInMachine,
    };
    state.gameStatus = { ...newStatus };
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
  drawBall: ({ commit, getters }: any) => {
    const { ballsInMachine } = getters.getGameStatus;
    if (!ballsInMachine.length) {
      console.log('GAME IS OVER!!!!!');
      return;
    }
    commit(GAME.DRAW_A_BALL);
  },
};

export interface GameState {
  game?: Game;
  gameStatus: GameStatus;
}
interface GameStatus {
  ballsPicked: Picture[];
  ballsInMachine: Picture[];
  drawnBall: Picture | null;
}
