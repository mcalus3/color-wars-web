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
import { modifyPlayer } from './GameLogic/modifyPlayer';

export function gameReducer(oldState: GameState = initialState, action: Action): GameState {
  var newState: GameState = { ...oldState };

  switch (action.type) {

    case TypeKeys.TICK:
      return Tick(newState);

    case TypeKeys.CREATE_BOARD:
      return createWorld(newState);

    case TypeKeys.ACTOR_ACTION:
      return HandleKeyboardInput(newState, action.key);

    case TypeKeys.CHANGE_DIRECTION:
      return changeDirection(newState, action.id, action.direction);

    case TypeKeys.RESIZE_BOARD:
      return resizeBoard(newState, action.size);

    case TypeKeys.MODIFY_PLAYER:
      return modifyPlayer(newState, action);

    case TypeKeys.SET_PLAYERS_AMOUNT:
      return setPlayersAmount(newState, action.amount);

    case TypeKeys.CHANGE_MAP_TEMPLATE:
      return changeMapTemplate(newState, action.value);

    case TypeKeys.PAUSE:
      newState.gamePhase = 'paused';
      return newState;

    case TypeKeys.RESUME:
      newState.gamePhase = 'running';
      return newState;

    case TypeKeys.SET_OPTIMIZATION:
      newState.optimized = action.value;
      return newState;

    case TypeKeys.SET_STARTING_TERRITORY:
      newState.startingTerritorySize = action.size;
      return newState;

    case TypeKeys.SET_GAME_TIME:
      newState.endTime = action.frames;
      return newState;

    case TypeKeys.TOUCH_SET:
      newState.touchscreenMode = action.value;
      return newState;

    default:
      return oldState;
  }
}
