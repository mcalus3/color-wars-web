export interface Ai {
  playerId: number;
  territoryBorder: Point[];
  territory: Point[];
  stepsDone: number;
  currentTargets: Point[];
  currentAction: string;
}

export interface Point {
  X: number;
  Y: number;
}

export interface Player {
  nextDirection: string;
  coords: Point;
  state: string;
  direction: string;
  
  name: string;
  speed: number;
  color: number;
  startCoords: Point;
  deathPenalty: number;
  AiControlled: boolean;
  AiDifficulty: number;
}

export interface GameState {
  gameState: string;
  currentTick: number;
  lastUpdatedCoords: Point[];
  activePlayers: number;
  dimension: Point;
  startingTerritorySize: number;
  optimized: boolean;
  endTime: number;
  
  fieldColors: number[][];
  fieldOccupiers: number[][];
  
  playersById: Player[];
  tailsById: Point[][];
  keyMappingsById: { [key: number]: string }[];
  ticksWaitingById: number[];
}
