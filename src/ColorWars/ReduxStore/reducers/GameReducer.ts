import { initialState } from '../../utils/initialState';
import { action } from '../actionTypes';
import { GameState } from '../../utils/objectTypes';
import { TypeKeys } from './../constants'
import { createWorld } from './GameLogic/CreateWorld';
import { Tick } from './GameLogic/Tick';
import { ExecuteAction } from './GameLogic/ExecuteAction';
import { resizeBoard } from './GameLogic/ResizeBoard';
import { setPlayersAmount } from './GameLogic/SetPlayersAmount';

export function gameReducer(oldState: GameState = initialState, action: action): GameState {
    var newState: GameState = {...oldState};

    switch (action.type) {
        case TypeKeys.TICK:
        newState = Tick(newState);
        return newState;

        case TypeKeys.CREATE_BOARD:
        newState = createWorld(newState);
        return newState;

        case TypeKeys.ACTOR_ACTION:
        newState = ExecuteAction(newState, action.key);        
        return newState;

        case TypeKeys.RESIZE_BOARD:
        newState = resizeBoard(newState, action.size);
        return newState;

        case TypeKeys.PAUSE:
        newState.gameState = 'paused';
        return newState;

        case TypeKeys.RESUME:
        newState.gameState = 'runing';
        return newState;

        case TypeKeys.SET_OPTIMIZATION:
        newState.optimized = action.value;
        return newState;

        case TypeKeys.RESIZE_BOARD:
        newState = resizeBoard(newState, action.size);
        return newState;

        case TypeKeys.MODIFY_PLAYER:
        newState.playersByName = {...newState.playersByName};
        newState.playersByName[action.name] = {
            ...newState.playersByName[action.name]};
        newState.playersByName[action.name][action.property] = action.value;
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

        default: return oldState;
    }
}