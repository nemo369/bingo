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
  picNum: {
    women: 4,
    ppl: 1,
  },
});

export const getters = {
  getGame: (state: GameState) => state.game,
  getBallsInMachine: (state: GameState) => state.gameStatus.ballsInMachine,
  getBallsPicked: (state: GameState) => state.gameStatus.ballsPicked,
  getDrawnBall: (state: GameState) => state.gameStatus.drawnBall,
  getGameStatus: (state: GameState) => state.gameStatus,
  getPicNum: (state: GameState) => state.picNum,
};

export const mutations = {
  [GAME.SET_PIC_NUM]: (state: GameState, num: PicNum) =>
    (state.picNum = { ...state.picNum, ...num }),
  [GAME.SET_GAME]: (state: GameState, game: Game) => (state.game = { ...game }),
  [GAME.RESET_GAME]: (state: GameState) => {
    state.gameStatus.drawnBall = null;
    state.gameStatus.ballsPicked = [];
    state.gameStatus.ballsInMachine = state.game
      ? shuffleArray(
          state.game.album.pictures.map((pic, i) => ({
            ...pic,
            ballNumber: i + 1,
          }))
        )
      : [];
  },
  [GAME.DRAW_A_BALL]: (state: GameState) => {
    const { ballsPicked, ballsInMachine, drawnBall } = state.gameStatus;
    const newBallsInMachine = ballsInMachine.filter((ball, i) =>
      i ? ball : null
    );
    const ballsPickedNew = [...ballsPicked];
    if (drawnBall) {
      ballsPickedNew.unshift(drawnBall);
    }
    const newStatus: GameStatus = {
      ballsPicked: ballsPickedNew,
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
  setPicNum: ({ commit }: any, num: PicNum) => {
    commit(GAME.SET_PIC_NUM, num);
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
  picNum: PicNum;
}
interface GameStatus {
  ballsPicked: Picture[];
  ballsInMachine: Picture[];
  drawnBall: Picture | null;
}

interface PicNum {
  women: number;
  ppl: number;
}
