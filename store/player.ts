/* eslint-disable camelcase */
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
  player: undefined,
});

export const getters = {
  getCards: (state: PlayerState) => state.cards,
  getColor: (state: PlayerState) => state.color,
  getPlayer: (state: PlayerState) => state.player,
};

export const mutations = {
  [PLAYER.SET_CARDS]: (state: PlayerState, cards: Card[]) =>
    (state.cards = [...cards]),
  [PLAYER.SET_COLOR]: (state: PlayerState, color: Color) =>
    (state.color = { ...color }),
  [PLAYER.SET_PLAYER]: (state: PlayerState, player: Player) =>
    (state.player = { ...player }),
};
export const actions: ActionTree<PlayerState, PlayerState> = {
  setColor: ({ commit }: any, color: any) => {
    Ls.setInObj(playerLocalStorge, color, 'color');
    commit(PLAYER.SET_COLOR, color);
  },
  setPlayer: ({ commit }: any, player: Player) => {
    const color = Ls.get(playerLocalStorge)?.color
      ? Ls.get(playerLocalStorge).color
      : getDefuletColor();
    Ls.set(playerLocalStorge, { ...player, color });
    commit(PLAYER.SET_PLAYER, player);
  },
};

interface PlayerState {
  cards: Card[];
  color: Color;
  player?: Player;
}
interface Color {
  prim: string;
  sec: string;
  bg: string;
}

interface Player {
  player_id: string;
  created: string;
  nickname: string;
  player_game_id: number;
  approved: boolean;
  game: number;
  board: unknown;
}
