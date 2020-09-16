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
