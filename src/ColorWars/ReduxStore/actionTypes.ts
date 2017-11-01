import { TypeKeys } from './constants'
import { Point, Player } from '../utils/objectTypes'

// Board

export interface createBoard {
    type: TypeKeys.CREATE_BOARD
}

export function createGame(): createBoard {
    return {
        type: TypeKeys.CREATE_BOARD
    }
}

export interface resizeBoard {
    type: TypeKeys.RESIZE_BOARD,
    size: Point
}

export function resizeBoard(size: Point): resizeBoard {
    return {
        type: TypeKeys.RESIZE_BOARD,
        size
    }
}

// Players

export interface setPlayersAmount {
    type: TypeKeys.SET_PLAYERS_AMOUNT,
    amount: number
}

export function setPlayersAmount(amount: number): setPlayersAmount {
    return {
        type: TypeKeys.SET_PLAYERS_AMOUNT,
        amount
    }
}

export interface addPlayer {
    type: TypeKeys.ADD_PLAYER,
    player: Player,
}

export function addPlayer(player: Player): addPlayer {
    return {
        type: TypeKeys.ADD_PLAYER,
        player
    }
}

export interface modifyPlayer {
    type: TypeKeys.MODIFY_PLAYER,
    name: string,
    property: string,
    value: any
}

export function modifyPlayer(name: string, property: string, value: any): modifyPlayer {
    return {
        type: TypeKeys.MODIFY_PLAYER,
        name,
        property,
        value
        }
}

export interface removePlayer {
    type: TypeKeys.REMOVE_PLAYER,
    name: string
}

export function removePlayer(name: string): removePlayer {
    return {
        type: TypeKeys.REMOVE_PLAYER,
        name: name
    }
}

// settings


export interface setOptimization {
    type: TypeKeys.SET_OPTIMIZATION,
    value: boolean
}

export function setOptimization(value: boolean): setOptimization {
    return {
        type: TypeKeys.SET_OPTIMIZATION,
        value
    }
}

export interface setGameTime {
    type: TypeKeys.SET_GAME_TIME,
    frames: number
}

export function setGameTime(frames: number): setGameTime {
    return {
        type: TypeKeys.SET_GAME_TIME,
        frames
    }
}

export interface setStartingTerritory {
    type: TypeKeys.SET_STARTING_TERRITORY,
    size: number
}

export function setStartingTerritory(size: number): setStartingTerritory {
    return {
        type: TypeKeys.SET_STARTING_TERRITORY,
        size
    }
}

// GAME ACTIONS

export interface tick {
    type: TypeKeys.TICK
}

export function tick(): tick {
    return {
        type: TypeKeys.TICK
    }
}

export interface pause {
    type: TypeKeys.PAUSE
}

export function pause(): pause {
    return {
        type: TypeKeys.PAUSE
    }
}

export interface resume {
    type: TypeKeys.RESUME
}

export function resume(): resume {
    return {
        type: TypeKeys.RESUME
    }
}

export interface restart {
    type: TypeKeys.RESTART
}

export function restart(): restart {
    return {
        type: TypeKeys.RESTART
    }
}

export interface actorAction {
    type: TypeKeys.ACTOR_ACTION,
    key: number
}

export function actorAction(key: number): actorAction {
    return {
        type: TypeKeys.ACTOR_ACTION,
        key
    }
}

export type gameAction = tick | actorAction | pause | resume;
export type settingsAction = setOptimization | setStartingTerritory | setGameTime;
export type fieldsAction = resizeBoard | createBoard;
export type playersAction = addPlayer | removePlayer | modifyPlayer | setPlayersAmount;

export type action = playersAction | fieldsAction | settingsAction | gameAction;

