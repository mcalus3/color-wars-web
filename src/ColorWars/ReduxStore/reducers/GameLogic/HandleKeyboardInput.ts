import { GameState } from '../../../utils/objectTypes';
import { changeDirection } from './changeDirection';
import { createWorld } from './CreateWorld';

export function HandleKeyboardInput(state: GameState, key: string): GameState {
  var gameState: GameState = state;

  if (gameState.pauseGameKey === key) {
    if (gameState.gamePhase === 'endGame') {
      gameState = createWorld(gameState);
    }

    if (gameState.gamePhase === 'paused') {
      gameState = { ...gameState, gamePhase: 'running' };
    } else if (gameState.gamePhase === 'running') {
      gameState = { ...gameState, gamePhase: 'paused' };
    } else if (gameState.gamePhase === 'initializing') {
      gameState = { ...gameState, gamePhase: 'running' };
    }
  } else {
    for (let i = 0; i < gameState.activePlayers; i++) {
      var mapping = gameState.keyMappingsById[i];
      if (key in mapping) {
        gameState = changeDirection(gameState, i, mapping[key]);
      }
    }
  }

  return gameState;
}
