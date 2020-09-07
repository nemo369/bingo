import { Condition } from '../types/game';

export const conditions: Condition[] = [
  // 3X3
  {
    title: 'any 1 line',
    id: 2,
    row: 3,
    column: 3,
    patterns: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  },
  {
    title: 'any 2 lines',
    id: 3,
    row: 3,
    column: 3,
    patterns: [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ],
  },
  {
    title: 'Full House',
    id: 1,
    row: 3,
    column: 3,
    patterns: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
  },
  //   4X4
  {
    title: 'any 1 line',
    id: 6,
    row: 4,
    column: 4,
    patterns: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ],
  },
  {
    title: 'X pattern',
    id: 5,
    row: 4,
    column: 4,
    patterns: [[1, 4, 6, 7, 10, 11, 13, 16]],
  },
  {
    title: 'full house',
    id: 4,
    row: 4,
    column: 4,
    patterns: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
  },

  //   5X5

  {
    title: 'any 1 line',
    id: 9,
    row: 5,
    column: 5,
    patterns: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 15, 15],
      [16, 17, 18.19, 20],
      [21, 22, 23, 24, 25],
    ],
  },
  {
    title: 'smiley pattern',
    id: 8,
    row: 5,
    column: 5,
    patterns: [[7, 9, 16, 20, 22, 23, 24]],
  },
  {
    title: 'full house',
    id: 7,
    row: 5,
    column: 5,
    patterns: [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
      ],
    ],
  },
];
