import { FRAMES_PER_SEC } from './functions';
import { GameState } from './objectTypes';

export const initialState: GameState = {
  gamePhase: 'running',
  currentTick: 0,
  lastUpdatedCoords: [],
  activePlayers: 4,
  dimension: { X: 60, Y: 60 },
  startingTerritorySize: 2,
  optimized: false,
  endTime: 60 * FRAMES_PER_SEC,
  touchscreenMode: 0,
  pauseGameKey: ' ',
  
  fieldColors: [[]],
  fieldOccupiers: [[]],

  playersById: [
    {
      name: 'Marek',
      direction: 'none',
      coords: { X: 3, Y: 3 },
      state: 'defensive',
      color: 1,
      startCoords: { X: 3, Y: 3 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: false,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Maciek',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 2,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player3',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 3,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player4',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 4,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player5',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 5,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player6',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 6,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player7',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 7,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
    },
    {
      name: 'Player8',
      direction: 'none',
      coords: { X: 10, Y: 10 },
      state: 'defensive',
      color: 8,
      startCoords: { X: 10, Y: 10 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      AiControlled: true,
      AiDifficulty: 1,
      deaths: 0
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
      'w': 'up',
      's': 'down',
      'a': 'left',
      'd': 'right'
    },
    {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    },
    {
      '8': 'up',
      '5': 'down',
      '4': 'left',
      '6': 'right'
    },
    {
      'i': 'up',
      'k': 'down',
      'j': 'left',
      'l': 'right'
    },
    {
      'f': 'up',
      'v': 'down',
      'c': 'left',
      'b': 'right'
    },
    {
      ';': 'up',
      '/': 'down',
      '.': 'left',
      'Shift': 'right'
    },
    {
      '-': 'up',
      '[': 'down',
      'p': 'left',
      ']': 'right'
    },
    {
      'Home': 'up',
      'Delete': 'down',
      'End': 'left',
      'PageDown': 'right'
    }
  ]
};
