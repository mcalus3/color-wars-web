import { preconfiguredSettings } from './PreconfiguredSettings';
import { GameState, GameSettings } from '../../../utils/objectTypes';
import { createWorld } from './CreateWorld';

export function changeMapTemplate(state: GameState, templateNo: number): GameState {

  return setMapTemplate(state, preconfiguredSettings[templateNo]);
}  

export function setMapTemplate(state: GameState, settings: GameSettings): GameState {
  var gameState: GameState = { ...state };

  // Aassign settings
  for (let key in settings){
    if (key !== 'playersById'){
      gameState[key] = settings[key];      
    }
  }
  for (let i = 0; i < settings.playersById.length; i++){

    gameState.playersById[i] = {...gameState.playersById[i] };

    for (let key in settings.playersById[i]){
      
      gameState.playersById[i][key] = settings.playersById[i][key];
    }
  }
  // Restart game
  
  let gameState2 = createWorld(gameState);

  return gameState2;
}