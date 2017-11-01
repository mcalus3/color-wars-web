import { getEmptyFieldOccupiers, claimStartingFields, setStartingPosition } from './CreateWorld';
import { GameState, Point } from '../../../utils/objectTypes';
import { colorNameToNum } from '../../../utils/functions';

export function resizeBoard(state: GameState, size: Point): GameState{
    
  var gameState: GameState = {...state};
  gameState.playersByName = {...gameState.playersByName};
  gameState.tailsByName = {...gameState.tailsByName};
  
  // change board dimension
  gameState.dimension = {...size};

  // create board
  gameState.fieldColors = trim2dBoard(gameState.fieldColors, size);
  gameState.fieldOccupiers = getEmptyFieldOccupiers(size);
  
  // for each active player:
  gameState.playerNames.slice(0, gameState.activePlayers).forEach((value: string, index) => {

    var curPlayer = {...gameState.playersByName[value]};
    gameState.playersByName[value] = curPlayer;

    var curTail = gameState.tailsByName[value].slice();

    // set starting position and move player at it
    curPlayer.startCoords = setStartingPosition(index, gameState.dimension);
    curPlayer.coords = {...curPlayer.startCoords};

    // delete tail
    curTail = [];

    gameState.tailsByName[value] = curTail;
    // claim starting fields
    gameState = claimStartingFields(gameState, curPlayer.name);
  });

  return gameState;
}

export function trim2dBoard(inArr: any[][], size: Point): any[][]{
  var newArr: any[][] = [];
  
  for(let i = 0; i < size.X; i++){
    newArr[i] = [];
    for(let j = 0; j < size.Y; j++){
      if (i >= inArr.length || j >= inArr[i].length){
        newArr[i][j] = colorNameToNum['white'];  
      } else {
        newArr[i][j] = inArr[i][j];        
      }
    }
  }
  return newArr;
};