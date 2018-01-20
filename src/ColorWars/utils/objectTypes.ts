export interface Ai {
  playerId: number;
  territoryBorder: Point[];
  territory: Point[];
  stepsDone: number;
  currentTargets: Point[];
  currentAction: string;
  currentDirection: string;
  precision: number;
  PlayerHasDied: boolean;
  playerHasntMoved: boolean;
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
  deaths: number;
  kills: number;
  
  name: string;
  speed: number;
  color: number;
  startCoords: Point;
  deathPenalty: number;
  aiControlled: boolean;
  aiDifficulty: number;
  avatar: number;
}

export interface GameState {
  gamePhase: string;
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
  keyMappingsById: { [key: string]: string }[];
  ticksWaitingById: number[];
  touchscreenMode: number;
  pauseGameKey: string;
}

export interface GameSettings {
  activePlayers: number;
  dimension: Point;
  startingTerritorySize: number;
  endTime: number;
  
  playersById: PlayerSettings[];
}

export interface PlayerSettings {
  name: string;
  speed: number;
  color: number;
  deathPenalty: number;
}