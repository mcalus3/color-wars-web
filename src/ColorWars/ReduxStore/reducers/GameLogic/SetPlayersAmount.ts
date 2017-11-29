import { claimStartingFields, setStartingPosition } from './CreateWorld';
import { GameState } from '../../../utils/objectTypes';

export function setPlayersAmount(state: GameState, amount: number): GameState {
  var gameState: GameState = { ...state };

  if (amount > gameState.activePlayers) {
    gameState.playersById = gameState.playersById.slice();

  for (let i = 0; i < gameState.activePlayers; i++) {
    let curPlayer = { ...gameState.playersById[i] };
    gameState.playersById[i] = curPlayer;

    curPlayer.startCoords = setStartingPosition(
      gameState.activePlayers + i,
      gameState.dimension
    );
    curPlayer.coords = { ...curPlayer.startCoords };
    gameState = claimStartingFields(gameState, i);
  };
  } else if (amount < gameState.activePlayers) {
    gameState.playersById = gameState.playersById.slice();

    for (let i = 0; i < gameState.activePlayers; i++) {
      let curPlayer = { ...gameState.playersById[i] };
        gameState.playersById[i] = curPlayer;
        gameState.tailsById = gameState.tailsById.slice();

        gameState.tailsById[i] = [];

        curPlayer.coords = { ...curPlayer.startCoords };
      };
  }

  gameState.activePlayers = amount;

  return gameState;
}
