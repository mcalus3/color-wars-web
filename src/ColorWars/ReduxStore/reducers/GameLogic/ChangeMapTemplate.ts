import { preconfiguredSettings } from './PreconfiguredSettings';
import { GameState, GameSettings } from '../../../utils/objectTypes';
import { createWorld } from './CreateWorld';

export function changeMapTemplate(
  state: GameState,
  templateNo: number
): GameState {
  var gameState: GameState = { ...state };
  let settings: GameSettings = preconfiguredSettings[templateNo];

  // Assign settings that are not named 'playersById'
  for (let key in settings) {
    if (key !== 'playersById') {
      gameState[key] = settings[key];
    }
  }

  // Assign players separately
  for (let i = 0; i < settings.playersById.length; i++) {
    gameState.playersById[i] = { ...gameState.playersById[i] };

    for (let key of Object.keys(settings.playersById[i])) {
      gameState.playersById[i][key] = settings.playersById[i][key];
    }
  }

  // Restart game
  gameState = createWorld(gameState);

  return gameState;
}
