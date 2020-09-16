import { ActionTree } from 'vuex';
import { GAME } from './mutations-types';
import { Game, Prize, Condition } from '~/app/types/game';
import { gameService } from '~/services/game.service';
import { Picture, Album } from '~/app/types/album';
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
  isDraiwng: false,
});

export const getters = {
  getGame: (state: GameState) => state.game,
  getBallsInMachine: (state: GameState) => state.gameStatus.ballsInMachine,
  getBallsPicked: (state: GameState) => state.gameStatus.ballsPicked,
  getDrawnBall: (state: GameState) => state.gameStatus.drawnBall,
  getGameStatus: (state: GameState) => state.gameStatus,
  getPicNum: (state: GameState) => state.picNum,
  getIsDrawing: (state: GameState) => state.isDraiwng,
};

export const mutations = {
  [GAME.SET_PIC_NUM]: (state: GameState, num: PicNum) =>
    (state.picNum = { ...state.picNum, ...num }),
  [GAME.SET_IS_DRAWING]: (state: GameState, isDraiwng: boolean) =>
    (state.isDraiwng = isDraiwng),
  [GAME.SET_GAME]: (state: GameState, game: Game) => (state.game = { ...game }),
  [GAME.RESET_GAME]: (state: GameState, album: Album) => {
    state.gameStatus.drawnBall = null;
    state.gameStatus.ballsPicked = [];
    state.gameStatus.ballsInMachine =
      state.game && album.pictures
        ? shuffleArray(
            album.pictures.map((pic, i) => ({
              ...pic,
              ballNumber: i + 1,
            }))
          )
        : [];
  },
  [GAME.DRAW_A_BALL]: (state: GameState, pickedBall: Picture) => {
    const { ballsPicked, ballsInMachine } = state.gameStatus;
    const newBallsInMachine = ballsInMachine.filter(
      (ball) => ball.asset_id !== pickedBall.asset_id
    );
    const ballsPickedNew = [...ballsPicked, { ...pickedBall }];

    const newStatus: GameStatus = {
      ballsPicked: ballsPickedNew,
      drawnBall: { ...pickedBall },
      ballsInMachine: newBallsInMachine,
    };
    state.gameStatus = newStatus;
  },
  [GAME.UPDATE_GAME]: (state: GameState, data: any) => {
    state.game = { ...state.game, ...data };
  },
};
export const actions: ActionTree<GameState, GameState> = {
  trySetGame: ({ commit }: any, gameToset: GameToSet) => {
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
  resetGame: ({ commit }: any, album: Album) => {
    commit(GAME.RESET_GAME, album);
  },
  updateGame: ({ commit }: any, data: { [key: string]: any }) => {
    commit(GAME.UPDATE_GAME, data);
  },
  drawBall: ({ commit, getters }: any) => {
    const { pin } = getters.getGame;
    commit(GAME.SET_IS_DRAWING, true);
    return gameService.nextBall(pin).then((newStatus: NewStatus) => {
      setTimeout(() => {
        commit(GAME.SET_IS_DRAWING, false);
      }, 1000);
      commit(GAME.DRAW_A_BALL, newStatus.picture);
    });
  },
};

export interface GameState {
  game?: Game;
  gameStatus: GameStatus;
  picNum: PicNum;
  isDraiwng: boolean;
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

export interface GameToSet {
  conditions: Condition[];
  prizes: Prize[];
  isPublic: boolean;
  album: Album;
}

export interface NewStatus {
  // eslint-disable-next-line camelcase
  remaining_pictures: number;
  picture: Picture;
}
