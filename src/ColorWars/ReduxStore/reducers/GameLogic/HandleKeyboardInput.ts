import { GameState } from '../../../utils/objectTypes';
import { changeDirection } from './changeDirection';

export function HandleKeyboardInput(state: GameState, key: number): GameState {
  var gameState: GameState = state;
  
  for(let i = 0; i < gameState.activePlayers; i++){
    var mapping = gameState.keyMappingsById[i];
    if (key in mapping) {
      gameState = changeDirection(gameState, i, mapping[key]);
    
    }
  };

  return gameState;
}