import { Picture } from './album';

export interface Card {
  row: number;
  column: number;
  pictures: Picture[];
  userId: number;
}
