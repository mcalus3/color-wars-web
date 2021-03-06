import { COLOR_NUMS, outOfBoard } from '../../../utils/functions';
import { GameState, Point } from '../../../utils/objectTypes';

export function createWorld(state: GameState): GameState {
  var gameState: GameState = { ...state };
  gameState.playersById = gameState.playersById.slice();
  gameState.tailsById = gameState.tailsById.slice();

  // create board
  gameState.fieldColors = getEmptyFieldColors(gameState.dimension);
  gameState.fieldOccupiers = getEmptyFieldOccupiers(gameState.dimension);
  for (let i = 0; i < gameState.tailsById.length; i++) {
    gameState.tailsById[i] = [];
  }

  // clean fields canvas from last game
  gameState = claimFields(
    gameState,
    getAllCoords(gameState.dimension),
    COLOR_NUMS.White
  );

  // set startTime and game state
  gameState.currentTick = 0;
  gameState.gamePhase = 'initializing';

  // for each active player:
  for (let i = 0; i < gameState.activePlayers; i++) {
    var curPlayer = { ...gameState.playersById[i] };
    gameState.playersById[i] = curPlayer;

    // set starting position and move player at it
    curPlayer.startCoords = setStartingPosition(i, gameState.dimension);
    curPlayer.coords = { ...curPlayer.startCoords };
    curPlayer.state = 'defensive';
    gameState.ticksWaitingById[i] = 0;

    // claim starting fields
    gameState = claimStartingFields(gameState, i);
  }
  return gameState;
}

export function getEmptyFieldColors(dimension: Point): number[][] {
  var fields: number[][] = [];

  for (var x: number = 0; x < dimension.X; x++) {
    fields[x] = [];
    for (var y: number = 0; y < dimension.Y; y++) {
      fields[x][y] = COLOR_NUMS.White;
    }
  }

  return fields;
}

export function getEmptyFieldOccupiers(dimension: Point): number[][] {
  var fields: number[][] = [];

  for (var x: number = 0; x < dimension.X; x++) {
    fields[x] = [];
    for (var y: number = 0; y < dimension.Y; y++) {
      fields[x][y] = -1;
    }
  }

  return fields;
}

export function setStartingPosition(index: number, dim: Point): Point {
  var x: number = 0;
  var y: number = 0;

  switch (index) {
    case 0:
      x = Math.floor(dim.X / 4);
      y = Math.floor(dim.Y / 4);
      break;
    case 1:
      x = Math.floor((dim.X / 4) * 3);
      y = Math.floor((dim.Y / 4) * 3);
      break;
    case 2:
      x = Math.floor((dim.X / 4) * 3);
      y = Math.floor(dim.Y / 4);
      break;
    case 3:
      x = Math.floor(dim.X / 4);
      y = Math.floor((dim.Y / 4) * 3);
      break;
    case 4:
      x = Math.floor(dim.X / 2);
      y = Math.floor(dim.Y / 4);
      break;
    case 5:
      x = Math.floor(dim.X / 2);
      y = Math.floor((dim.Y / 4) * 3);
      break;
    case 6:
      x = Math.floor((dim.X / 4) * 3);
      y = Math.floor(dim.Y / 2);
      break;
    case 7:
      x = Math.floor(dim.X / 4);
      y = Math.floor(dim.Y / 2);
      break;
    default:
      x = Math.ceil(Math.random() * (dim.X - 2));
      y = Math.ceil(Math.random() * (dim.Y - 2));
  }
  return { X: x, Y: y };
}

export function claimStartingFields(state: GameState, id: number): GameState {
  var newState = { ...state };
  var claimedCoords: Point[] = [];
  var startingTerritorySize = state.startingTerritorySize;
  var coords = state.playersById[id].startCoords;

  for (var x = -startingTerritorySize; x <= startingTerritorySize; ++x) {
    for (var y = -startingTerritorySize; y <= startingTerritorySize; ++y) {
      if (x * x + y * y <= startingTerritorySize * startingTerritorySize) {
        let point: Point = { X: x + coords.X, Y: y + coords.Y };
        if (!outOfBoard(point, state.dimension)) {
          claimedCoords.push(point);
        }
      }
    }
  }
  return claimFields(newState, claimedCoords, state.playersById[id].color);
}

export function claimFields(
  state: GameState,
  coords: Point[],
  color: number
): GameState {
  var newState = { ...state };
  var newFields: number[][] = newState.fieldColors.slice();

  coords.forEach((p: Point) => {
    newFields[p.X] = newFields[p.X].slice();
    newFields[p.X][p.Y] = color;
  });

  newState.lastUpdatedCoords = newState.lastUpdatedCoords.concat(coords);
  newState.fieldColors = newFields;
  return newState;
}

export function getAllCoords(size: Point): Point[] {
  var coords: Point[] = [];
  for (let i = 0; i < size.X; i++) {
    for (let j = 0; j < size.Y; j++) {
      coords.push({ X: i, Y: j });
    }
  }
  return coords;
}
