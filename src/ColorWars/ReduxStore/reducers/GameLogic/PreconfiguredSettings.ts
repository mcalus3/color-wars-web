import { GameSettings } from '../../../utils/objectTypes';
import { FRAMES_PER_SEC } from '../../../utils/functions';

export var preconfiguredSettings: { [n: number]: GameSettings } = {
  0: {
    activePlayers: 8,
    dimension: { X: 60, Y: 60 },
    startingTerritorySize: 2,
    endTime: 180 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 3,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 4,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 5,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 6,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 7,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 8,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      }
    ]
  },
  1: {
    activePlayers: 8,
    dimension: { X: 100, Y: 100 },
    startingTerritorySize: 4,
    endTime: 300 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 3,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 4,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 5,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 6,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 7,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 8,
        speed: 0.25,
        deathPenalty: 1 * FRAMES_PER_SEC
      }
    ]
  },
  2: {
    activePlayers: 8,
    dimension: { X: 60, Y: 60 },
    startingTerritorySize: 4,
    endTime: 180 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      }
    ]
  },
  3: {
    activePlayers: 8,
    dimension: { X: 60, Y: 60 },
    startingTerritorySize: 2,
    endTime: 180 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 3,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 4,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 1,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 2,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 3,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 4,
        speed: 1,
        deathPenalty: 4 * FRAMES_PER_SEC
      }
    ]
  },
  4: {
    activePlayers: 2,
    dimension: { X: 30, Y: 15 },
    startingTerritorySize: 2,
    endTime: 60 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player3',
        color: 3,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player4',
        color: 4,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player5',
        color: 5,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player6',
        color: 6,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player7',
        color: 7,
        speed: 1,
        deathPenalty: Infinity
      },
      {
        name: 'Player8',
        color: 8,
        speed: 1,
        deathPenalty: Infinity
      }
    ]
  },
  5: {
    activePlayers: 2,
    dimension: { X: 30, Y: 15 },
    startingTerritorySize: 2,
    endTime: 60 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player3',
        color: 3,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player4',
        color: 4,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player5',
        color: 5,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player6',
        color: 6,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player7',
        color: 7,
        speed: 3,
        deathPenalty: Infinity
      },
      {
        name: 'Player8',
        color: 8,
        speed: 3,
        deathPenalty: Infinity
      }
    ]
  },
  6: {
    activePlayers: 4,
    dimension: { X: 50, Y: 25 },
    startingTerritorySize: 2,
    endTime: 180 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 1,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 2,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 5,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 6,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 7,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 8,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      }
    ]
  },
  7: {
    activePlayers: 3,
    dimension: { X: 50, Y: 25 },
    startingTerritorySize: 2,
    endTime: 180 * FRAMES_PER_SEC,

    playersById: [
      {
        name: 'Marek',
        color: 1,
        speed: 1,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Maciek',
        color: 2,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player3',
        color: 2,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player4',
        color: 2,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player5',
        color: 5,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player6',
        color: 6,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player7',
        color: 7,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      },
      {
        name: 'Player8',
        color: 8,
        speed: 2,
        deathPenalty: 5 * FRAMES_PER_SEC
      }
    ]
  }
};
