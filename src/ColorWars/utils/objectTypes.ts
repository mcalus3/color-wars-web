export interface Point{
    X: number;
    Y: number;
}

export interface Player {
    name: string,
    direction: string,
    coords: Point,
    state: string,
    speed: number,
    color: number,
    startCoords: Point,
    keyMapping: {[key: number]: string},
    deathPenalty: number;
}

export interface PlayerByName {
    [name: string]: Player;
}

export interface TailByName {
    [name: string]: Point[];
}

export interface GameState {
    fieldColors: number[][],
    fieldOccupiers: string[][],
    dimension: Point,
    lastUpdatedCoords: Point[],
    startingTerritorySize: number
    playersByName: PlayerByName,
    playerNames: string[],
    activePlayers: number
    optimized: boolean,
    endTime: number
    gameState: string,
    currentTick: number,
    tailsByName: TailByName,
    ticksWaitingByName: {[name: string]:number}
    
}