import { claimStartingFields, setStartingPosition } from './CreateWorld';
import { GameState } from '../../../utils/objectTypes';

export function setPlayersAmount(state: GameState, amount: number): GameState{
  var gameState: GameState = {...state};
    
  if (amount > gameState.activePlayers){
    gameState.playersByName = {...gameState.playersByName};
    
    gameState.playerNames.slice(gameState.activePlayers, amount).forEach((value: string, index: number) => {

      var curPlayer = {...gameState.playersByName[value]};
      gameState.playersByName[value] = curPlayer;

      curPlayer.startCoords = setStartingPosition(gameState.activePlayers + index, gameState.dimension);
      curPlayer.coords = {...curPlayer.startCoords};
      gameState = claimStartingFields(gameState, value);
      
    });
  } else if (amount < gameState.activePlayers) {
    gameState.playersByName = {...gameState.playersByName};
    
    gameState.playerNames.slice(amount, gameState.activePlayers).forEach((value: string, index) => {

      var curPlayer = {...gameState.playersByName[value]};
      gameState.playersByName[value] = curPlayer;
      gameState.tailsByName = {...gameState.tailsByName};
      
      gameState.tailsByName[value] = [];

      curPlayer.coords = {...curPlayer.startCoords};
    });
  }

  gameState.activePlayers = amount;
  
  return gameState;
}




