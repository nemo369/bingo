import { User } from './user';
import { Picture } from './album';

export interface Game {
  name: string;
  pin: number;
  conditions: Condition[];
  host: User;
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
