import {
  getEmptyFieldOccupiers,
  claimStartingFields,
  setStartingPosition
} from './CreateWorld';
import { GameState, Point } from '../../../utils/objectTypes';
import { COLOR_NUMS } from '../../../utils/functions';

export function resizeBoard(state: GameState, size: Point): GameState {
  var gameState: GameState = { ...state };
  gameState.playersById = gameState.playersById.slice();
  gameState.tailsById = gameState.tailsById.slice();

  // change board dimension
  gameState.dimension = { ...size };

  // create board
  gameState.fieldColors = trim2dBoard(gameState.fieldColors, size);
  gameState.fieldOccupiers = getEmptyFieldOccupiers(size);

  // for each active player:
  for (let i = 0; i < gameState.activePlayers; i++) {
    var curPlayer = { ...gameState.playersById[i] };
    gameState.playersById[i] = curPlayer;

    var curTail = gameState.tailsById[i].slice();

    // set starting position and move player at it
    curPlayer.startCoords = setStartingPosition(i, gameState.dimension);
    curPlayer.coords = { ...curPlayer.startCoords };

    // delete tail
    curTail = [];

    gameState.tailsById[i] = curTail;
    // claim starting fields
    gameState = claimStartingFields(gameState, i);
  }

  return gameState;
}

export function trim2dBoard(inArr: any[][], size: Point): any[][] {
  var newArr: any[][] = [];

  for (let i = 0; i < size.X; i++) {
    newArr[i] = [];
    for (let j = 0; j < size.Y; j++) {
      if (i >= inArr.length || j >= inArr[i].length) {
        newArr[i][j] = COLOR_NUMS.White;
      } else {
        newArr[i][j] = inArr[i][j];
      }
    }
  }
  return newArr;
}
