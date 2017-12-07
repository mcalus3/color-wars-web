import { initialState } from '../../utils/initialState';
import { Action } from '../actionTypes';
import { GameState } from '../../utils/objectTypes';
import { TypeKeys } from './../constants';
import { createWorld } from './GameLogic/CreateWorld';
import { Tick } from './GameLogic/Tick';
import { HandleKeyboardInput } from './GameLogic/HandleKeyboardInput';
import { changeDirection } from './GameLogic/changeDirection';
import { resizeBoard } from './GameLogic/ResizeBoard';
import { setPlayersAmount } from './GameLogic/SetPlayersAmount';
import { changeMapTemplate } from './GameLogic/ChangeMapTemplate';

export function gameReducer(
  oldState: GameState = initialState,
  action: Action
): GameState {
  var newState: GameState = { ...oldState };

  switch (action.type) {
    case TypeKeys.TICK:
      newState = Tick(newState);
      return newState;

    case TypeKeys.CREATE_BOARD:
      newState = createWorld(newState);
      return newState;

    case TypeKeys.ACTOR_ACTION:
      newState = HandleKeyboardInput(newState, action.key);
      return newState;

      case TypeKeys.CHANGE_DIRECTION:
      newState = changeDirection(newState, action.id, action.direction);
      return newState;

    case TypeKeys.RESIZE_BOARD:
      newState = resizeBoard(newState, action.size);
      return newState;

    case TypeKeys.PAUSE:
      newState.gamePhase = 'paused';
      return newState;

    case TypeKeys.RESUME:
      newState.gamePhase = 'runing';
      return newState;

    case TypeKeys.SET_OPTIMIZATION:
      newState.optimized = action.value;
      return newState;

    case TypeKeys.RESIZE_BOARD:
      newState = resizeBoard(newState, action.size);
      return newState;

    case TypeKeys.MODIFY_PLAYER:
      newState.playersById = newState.playersById.slice();
      
      if (action.property === 'keyMapping'){

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

    case TypeKeys.SET_PLAYERS_AMOUNT:
      newState = setPlayersAmount(newState, action.amount);
      return newState;

    case TypeKeys.SET_STARTING_TERRITORY:
      newState.startingTerritorySize = action.size;
      return newState;

    case TypeKeys.SET_GAME_TIME:
      newState.endTime = action.frames;
      return newState;

      case TypeKeys.TOUCH_SET:
      newState.touchscreenDetected = action.value;
      return newState;

      case TypeKeys.CHANGE_MAP_TEMPLATE:
      newState = changeMapTemplate(newState, action.value);
      return newState;

      default:
      return oldState;
  }
}
