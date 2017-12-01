import { copy2dBoard, outOfBoard } from '../../../utils/functions';
import {
  GameState,
  Player,
  Point,
} from '../../../utils/objectTypes';
import { claimTerritoryAlgorithm } from './claimingAlgorithm';
import { claimFields } from './CreateWorld';

export function Tick(state: GameState) {
  // handle pause
  if (state.gameState === 'paused') {
    return state;
  }

  var gameState: GameState = { ...state };

  if (gameState.gameState === 'initializing') {
    gameState.gameState = 'running';
  }

  // check if the game should end already
  if (gameState.currentTick >= gameState.endTime) {
    gameState = { ...gameState, gameState: 'endGame' };
    return gameState;
  } else {
    gameState = { ...gameState, currentTick: gameState.currentTick + 1, gameState: 'running' };
  }

  // clear last updated coords table
  if (gameState.lastUpdatedCoords.length !== 0) {
    gameState.lastUpdatedCoords = [];
  }

  // update game for every active player
  for (let i = 0; i < gameState.activePlayers; i++) {
    gameState = updatePlayer(gameState, i);
  }
  return gameState;
}

export function updatePlayer(state: GameState, id: number) {
  var gameState: GameState = { ...state };

  // player movement is executed once per couple of ticks
  if (gameState.ticksWaitingById[id] > 0) {
    gameState.ticksWaitingById[id] -= 1;

    return gameState;
  }

  var playersById: Player[] = gameState.playersById.slice();
  var tailsById: Point[][] = gameState.tailsById.slice();
  var player: Player = { ...playersById[id] };
  var tail: Point[] = tailsById[id].slice();

  playersById[id] = player;
  tailsById[id] = tail;
  gameState.playersById = playersById;
  gameState.tailsById = tailsById;
  gameState.fieldOccupiers = copy2dBoard(gameState.fieldOccupiers);

  // set next waiting period
  gameState.ticksWaitingById = gameState.ticksWaitingById.slice();
  gameState.ticksWaitingById[id] = gameState.playersById[id].speed - 1;

  // move player
  player.direction = player.nextDirection;
  player = movePlayer(player);

  // if he is out of bounds, kill him and return
  if (outOfBoard(player.coords, gameState.dimension)) {
    return killPlayer(gameState, id);
  }

  gameState.playersById[id] = player;
  var pX = player.coords.X;
  var pY = player.coords.Y;

  // if player was revived, set player's state
  if (player.state === 'dead'){
    if (gameState.fieldColors[pX][pY] !== player.color) {
      player.state = 'offensive';
    } else {
      player.state = 'defensive';
    }
  }

  // kill enemy tail on entered field
  gameState = EnterField(gameState, player.coords);
  
  // if player killed himself, abort update
  if (gameState.playersById[id].state === 'dead'){
    return gameState;
  }
  
  // if player is on enemy territory spawn tail
  if (gameState.fieldColors[pX][pY] !== player.color) {
    player.state = 'offensive';
    tail.push({ ...player.coords });

    // and register it for collision detection
    gameState.fieldOccupiers[pX][pY] = id;
  }

  // if player is on his own territory, claim fields, delete tail and unregister from collision detector
  if (
    gameState.fieldColors[pX][pY] === player.color &&
    player.state === 'offensive'
  ) {
    player.state = 'defensive';
    var claimedPoints: Point[] = claimTerritoryAlgorithm(
      tail,
      gameState.fieldColors,
      player.color
    );
    gameState = claimFields(gameState, claimedPoints, player.color);

    gameState = killTail(gameState, id);
  }

  return gameState;
}

export function killPlayer(state: GameState, id: number): GameState {
  var newState = killTail(state, id);
  newState.playersById = newState.playersById.slice();
  newState.ticksWaitingById = newState.ticksWaitingById.slice();
  var player = newState.playersById[id];

  newState.playersById[id] = {
    ...player,
    coords: { ...player.startCoords },
    state: 'dead'
  };
  newState.ticksWaitingById[id] = player.deathPenalty;

  return newState;
}

export function killTail(state: GameState, id: number): GameState {
  var newState: GameState = {
    ...state,
    tailsById: state.tailsById.slice(),
    fieldOccupiers: copy2dBoard(state.fieldOccupiers)
  };

  newState.tailsById[id].forEach(t => {
    newState.fieldOccupiers[t.X][t.Y] = -1;
  });
  newState.tailsById[id] = [];
  return newState;
}

function movePlayer(player: Player): Player {
  player = { ...player, coords: { ...player.coords } };

  switch (player.direction) {
    case 'up':
      player.coords.Y -= 1;
      break;
    case 'down':
      player.coords.Y += 1;
      break;
    case 'left':
      player.coords.X -= 1;
      break;
    case 'right':
      player.coords.X += 1;
      break;
    default:
      break;
  }
  return player;
}

function EnterField(state: GameState, field: Point): GameState {
  var id: number = state.fieldOccupiers[field.X][field.Y];
  if (id !== -1) {
    return killPlayer(state, id);
  }
  return state;
}
