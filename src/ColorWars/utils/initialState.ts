import { GameState } from './objectTypes';

export const initialState: GameState = {
  gameState: 'running',
  currentTick: 0,
  lastUpdatedCoords: [],
  activePlayers: 3,
  dimension: { X: 60, Y: 60 },
  startingTerritorySize: 2,
  optimized: false,
  endTime: 60 * 40,

  fieldColors: [[]],
  fieldOccupiers: [[]],

  playersById: [
    {
      name: 'Marek',
      direction: 'none',
      coords: { X: 3, Y: 3 },
      state: 'defensive',
      color: 32768,
      startCoords: { X: 3, Y: 3 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1
    },
    {
      name: 'Maciek',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 255,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1
    },
    {
      name: 'Player3',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 3,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1
    },
    {
      name: 'Player4',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 4,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 0
    },
    {
      name: 'Player5',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 5,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 0
    },
    {
      name: 'Player6',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 6,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 0
    },
    {
      name: 'Player7',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 7,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 0
    },
    {
      name: 'Player8',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 8,
      startCoords: { X: 10, Y: 10 },
      speed: 4,
      deathPenalty: 100,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 0
    }
  ],

  tailsById: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ],
  ticksWaitingById: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  keyMappingsById: [
    {
      87: 'up',
      83: 'down',
      65: 'left',
      68: 'right'
    },
    {
      38: 'up',
      40: 'down',
      37: 'left',
      39: 'right'
    },
    {
      104: 'up',
      101: 'down',
      100: 'left',
      102: 'right'
    },
    {
      73: 'up',
      75: 'down',
      74: 'left',
      76: 'right'
    },
    {
      70: 'up',
      86: 'down',
      67: 'left',
      66: 'right'
    },
    {
      54: 'up',
      89: 'down',
      84: 'left',
      85: 'right'
    },
    {
      186: 'up',
      191: 'down',
      190: 'left',
      16: 'right'
    },
    {
      189: 'up',
      219: 'down',
      80: 'left',
      221: 'right'
    }
  ]
};
