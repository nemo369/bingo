import { User } from './user';
import { Picture, Album } from './album';
import { Card } from './card';

export interface Game {
  name: string;
  pin: number;
  conditions: Condition[];
  host: User;
  album: Album;
  bingo: any;
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
}

export interface JoinGameRes {
  cards: Card[];
  name: string;
  isGameOpen: boolean;
  gamePin: number;
  gameHost: any;
  erros: string[];
}
