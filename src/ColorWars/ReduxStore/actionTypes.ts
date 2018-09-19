import { TypeKeys } from './constants';
import { Point } from '../utils/objectTypes';

// Board

export interface CreateBoard {
  type: TypeKeys.CREATE_BOARD;
}

export function createGame(): CreateBoard {
  return {
    type: TypeKeys.CREATE_BOARD
  };
}

export interface ResizeBoard {
  type: TypeKeys.RESIZE_BOARD;
  size: Point;
}

export function resizeBoard(size: Point): ResizeBoard {
  return {
    type: TypeKeys.RESIZE_BOARD,
    size
  };
}

// Players

export interface SetPlayersAmount {
  type: TypeKeys.SET_PLAYERS_AMOUNT;
  amount: number;
}

export function setPlayersAmount(amount: number): SetPlayersAmount {
  return {
    type: TypeKeys.SET_PLAYERS_AMOUNT,
    amount
  };
}

export interface AddPlayer {
  type: TypeKeys.ADD_PLAYER;
}

export function addPlayer(): AddPlayer {
  return {
    type: TypeKeys.ADD_PLAYER
  };
}

export interface ModifyPlayer {
  type: TypeKeys.MODIFY_PLAYER;
  id: number;
  property: string;
  value: any;
}

export function modifyPlayer(
  id: number,
  property: string,
  value: any
): ModifyPlayer {
  return {
    type: TypeKeys.MODIFY_PLAYER,
    id,
    property,
    value
  };
}

export interface RemovePlayer {
  type: TypeKeys.REMOVE_PLAYER;
  id: number;
}

export function removePlayer(id: number): RemovePlayer {
  return {
    type: TypeKeys.REMOVE_PLAYER,
    id
  };
}

export interface ChangeDirection {
  type: TypeKeys.CHANGE_DIRECTION;
  id: number;
  direction: string;
}

export function changeDirection(
  id: number,
  direction: string
): ChangeDirection {
  return {
    type: TypeKeys.CHANGE_DIRECTION,
    id,
    direction
  };
}

// settings

export interface ShowSettings {
  type: TypeKeys.SHOW_SETTINGS;
  value: boolean;
}

export function ShowSettings(value: boolean): ShowSettings {
  return {
    type: TypeKeys.SHOW_SETTINGS,
    value
  };
}

export interface SetOptimization {
  type: TypeKeys.SET_OPTIMIZATION;
  value: boolean;
}

export function setOptimization(value: boolean): SetOptimization {
  return {
    type: TypeKeys.SET_OPTIMIZATION,
    value
  };
}

export interface SetGameTime {
  type: TypeKeys.SET_GAME_TIME;
  frames: number;
}

export function setGameTime(frames: number): SetGameTime {
  return {
    type: TypeKeys.SET_GAME_TIME,
    frames
  };
}

export interface SetStartingTerritory {
  type: TypeKeys.SET_STARTING_TERRITORY;
  size: number;
}

export function setStartingTerritory(size: number): SetStartingTerritory {
  return {
    type: TypeKeys.SET_STARTING_TERRITORY,
    size
  };
}

export interface SetTouch {
  type: TypeKeys.TOUCH_SET;
  value: number;
}

export function setTouch(value: number): SetTouch {
  return {
    type: TypeKeys.TOUCH_SET,
    value
  };
}

export interface ChangeMapTemplate {
  type: TypeKeys.CHANGE_MAP_TEMPLATE;
  value: number;
}

export function changeMapTemplate(value: number): ChangeMapTemplate {
  return {
    type: TypeKeys.CHANGE_MAP_TEMPLATE,
    value
  };
}

// GAME ACTIONS

export interface Tick {
  type: TypeKeys.TICK;
}

export function tick(): Tick {
  return {
    type: TypeKeys.TICK
  };
}

export interface Pause {
  type: TypeKeys.PAUSE;
}

export function pause(): Pause {
  return {
    type: TypeKeys.PAUSE
  };
}

export interface Resume {
  type: TypeKeys.RESUME;
}

export function resume(): Resume {
  return {
    type: TypeKeys.RESUME
  };
}

export interface Restart {
  type: TypeKeys.RESTART;
}

export function restart(): Restart {
  return {
    type: TypeKeys.RESTART
  };
}

export interface ActorAction {
  type: TypeKeys.ACTOR_ACTION;
  key: string;
}

export function actorAction(key: string): ActorAction {
  return {
    type: TypeKeys.ACTOR_ACTION,
    key
  };
}

export type GameAction = Tick | ActorAction | Pause | Resume;
export type SettingsAction =
  | ShowSettings
  | SetOptimization
  | SetStartingTerritory
  | SetGameTime
  | SetTouch
  | ChangeMapTemplate;
export type FieldsAction = ResizeBoard | CreateBoard;
export type PlayersAction =
  | AddPlayer
  | RemovePlayer
  | ModifyPlayer
  | SetPlayersAmount
  | ChangeDirection;
export type Action = PlayersAction | FieldsAction | SettingsAction | GameAction;
