import { ModifyPlayer } from '../../actionTypes';
import { GameState } from '../../../utils/objectTypes';

export function modifyPlayer(oldState: GameState, action: ModifyPlayer) {
  let newState = { ...oldState };
  newState.playersById = newState.playersById.slice();

  if (action.property === 'keyMapping') {
    newState.keyMappingsById[action.id] = {
      ...newState.keyMappingsById[action.id]
    };
    newState.keyMappingsById[action.id] = action.value;
  } else {
    newState.playersById[action.id] = {
      ...newState.playersById[action.id]
    };
    newState.playersById[action.id][action.property] = action.value;
  }

  return newState;
}
