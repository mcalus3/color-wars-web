import { GameState } from "./objectTypes";

export const initialState: GameState = {
  gameState: 'running',
  currentTick: 0,
  optimized: false,
  endTime: 60*40,
  dimension: {X: 40, Y: 40},
  fieldColors: [[]],
  fieldOccupiers: [[]],
  lastUpdatedCoords: [],
  startingTerritorySize: 2,
  activePlayers: 4,
  playerNames: [ 'Marek', 'Maciek', 'Player3', 'Player4', 'Player5', 'Player6', 'Player7', 'Player8'],
  tailsByName: { 'Marek': [], 'Maciek': [] , 'Player3': [], 'Player4': [], 'Player5': [], 'Player6': [] , 'Player7': [], 'Player8': []},
  ticksWaitingByName: { 'Marek': 0, 'Maciek': 0 , 'Player3': 0 , 'Player4': 0, 'Player5': 0, 'Player6': 0 , 'Player7': 0 , 'Player8': 0},
  playersByName: {
    'Marek': {
      name: 'Marek',
      direction: 'none',
      coords: {X: 3, Y: 3},
      state: 'defensive',
      color: 32768,
      startCoords: {X: 3, Y: 3},
      speed: 5,
      keyMapping: {
        87: 'up',
        83: 'down',
        65: 'left',
        68: 'right'
    },
    deathPenalty: 100
    },
    'Maciek': {
      name: 'Maciek',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 255,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
      },
      deathPenalty: 100
    },
    'Player3': {
      name: 'Player3',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 3,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        104: 'up',
        101: 'down',
        100: 'left',
        102: 'right'
      },
      deathPenalty: 100
    },
    'Player4': {
      name: 'Player4',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 4,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        73: 'up',
        75: 'down',
        74: 'left',
        76: 'right'
      },
      deathPenalty: 100
    },
    'Player5': {
      name: 'Player5',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 5,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        70: 'up',
        86: 'down',
        67: 'left',
        66: 'right'
      },
      deathPenalty: 100
    },
    'Player6': {
      name: 'Player6',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 6,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        54: 'up',
        89: 'down',
        84: 'left',
        85: 'right'
      },
      deathPenalty: 100
    },
    'Player7': {
      name: 'Player7',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 7,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        186: 'up',
        191: 'down',
        190: 'left',
        16: 'right'
      },
      deathPenalty: 100
    },
    'Player8': {
      name: 'Player8',
      direction: 'none',
      coords: {X: 10, Y: 10},
      state: 'defensive',
      color: 8,
      startCoords: {X: 10, Y: 10},
      speed: 5,
      keyMapping: {
        189: 'up',
        219: 'down',
        80: 'left',
        221: 'right'
      },
      deathPenalty: 100
    }
  }
};