import { claimStartingFields, setStartingPosition } from './CreateWorld';
import { GameState } from '../../../utils/objectTypes';
import { killPlayer } from './Tick';
import { addPlayer } from './addPlayer';

export function setPlayersAmount(state: GameState, amount: number): GameState {
  var gameState: GameState = { ...state };

  // if amount is highet that playersById array length, create some players
  if (amount >= gameState.playersById.length){
    for (let i = gameState.playersById.length; i < amount; i++){
      gameState = addPlayer(gameState);
    }
  }
  
  // if amount is higher, then for each new player set starting position and claim starting fields
  if (amount > gameState.activePlayers) {
    gameState.playersById = gameState.playersById.slice();

  for (let i = gameState.activePlayers; i < amount; i++) {
    let curPlayer = { ...gameState.playersById[i] };
    gameState.playersById[i] = curPlayer;

    curPlayer.startCoords = setStartingPosition(
      i,
      gameState.dimension
    );
    curPlayer.coords = { ...curPlayer.startCoords };
    gameState = claimStartingFields(gameState, i);
  };

  // if amount is lower, then kill deactivated players
  } else if (amount < gameState.activePlayers) {
    gameState.playersById = gameState.playersById.slice();

    for (let i = amount-1; i < gameState.activePlayers; i++) {

        gameState = killPlayer(gameState, i);
      };
  }

  gameState.activePlayers = amount;

  return gameState;
}
