/* eslint-disable camelcase */
import { ServerCondition } from '../const/conditions';
import { Album, Picture } from './album';
import { Card } from './card';

export interface Game {
  name: string;
  pin: number;
  conditions: Condition[];
  hostId: number;
  album: Album;
  bingo: any;
  response: string;
  ended: boolean;
  board_size: number;
  // created: "2020-09-16T14:10:07.199649Z"
  game_cost: number | null;
  game_requested: boolean;
  id: number;
  is_finished: boolean;
  is_public: boolean;
  number_of_players: number;
  picturesPool: Picture[];
  playersList: Picture[];
  prizes: Prize[];
  shownPictures: Picture[];
  started: boolean;
  winning_conditions: ServerCondition[];
}

export interface GameToSend {
  conditions: Condition[];
  prizes: Prize[];
}

export interface Prize {
  name?: string;
  picture: Picture;
  conditionId: number;
}

export interface Condition {
  title: string;
  id: number;
  row: number;
  column: number;
  patterns: number[][];
  serverName: ServerCondition;
}

export interface JoinGameRes {
  cards: Card[];
  name: string;
  isGameOpen: boolean;
  gamePin: number;
  gameHost: any;
  erros: string[];
}
