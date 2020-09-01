import { User } from './user';

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
  picture: {
    url: string;
  };
  conditionId: number;
}

export interface Condition {
  title: string;
  id: number;
  row: number;
  column: number;
  patterns: number[][];
}
