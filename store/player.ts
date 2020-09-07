import { ActionTree } from 'vuex';
import { PLAYER } from './mutations-types';

import { Card } from '~/app/types/card';
import { gameService } from '~/services/game.service';
import { JoinGameRes } from '~/app/types/game';

import { Ls, playerLocalStorge } from '~/app/utils/localStorage';
const getDefuletColor = (): Color => ({
  prim: 'red',
  sec: 'red',
  bg: 'red',
});
const colorInit =
  (Ls.get(playerLocalStorge)?.color as Color) || getDefuletColor();

export const state = (): PlayerState => ({
  cards: [],
  color: colorInit,
});

export const getters = {
  getCards: (state: PlayerState) => state.cards,
  getColor: (state: PlayerState) => state.color,
};

export const mutations = {
  [PLAYER.SET_CARDS]: (state: PlayerState, cards: Card[]) =>
    (state.cards = [...cards]),
  [PLAYER.SET_COLOR]: (state: PlayerState, color: Color) =>
    (state.color = { ...color }),
};
export const actions: ActionTree<PlayerState, PlayerState> = {
  setColor: ({ commit }: any, color: any) => {
    const player = Ls.get(playerLocalStorge);
    Ls.set(playerLocalStorge, { ...player, color });
    commit(PLAYER.SET_COLOR, color);
  },
  joinGame: ({ commit }: any, joinGame: { pin: number; name: string }) => {
    return gameService.joinGame(joinGame).then((info: JoinGameRes) => {
      if (info.erros.length) {
        return info.erros;
      } else {
        commit(PLAYER.SET_CARDS, info.cards);
      }
    });
  },
};

interface PlayerState {
  cards: Card[];
  color: Color;
}
interface Color {
  prim: string;
  sec: string;
  bg: string;
}
