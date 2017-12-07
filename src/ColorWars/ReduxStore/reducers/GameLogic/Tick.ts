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
  if (state.gamePhase === 'paused') {
    return state;
  }

  var gameState: GameState = { ...state };

  if (gameState.gamePhase === 'initializing') {
    gameState.gamePhase = 'running';
  }

  // check if the game should end already
  if (gameState.currentTick >= gameState.endTime) {
    gameState = { ...gameState, gamePhase: 'endGame' };
    return gameState;
  } else {
    gameState = { ...gameState, currentTick: gameState.currentTick + 1, gamePhase: 'running' };
  }

  // clear last updated coords table
  if (gameState.lastUpdatedCoords.length !== 0) {
    gameState.lastUpdatedCoords = [];
  }

  // update game for every active player
  for (let i = 0; i < gameState.activePlayers; i++) {
    gameState = updatePlayer(gameState, i);
  }

  gameState = fieldsStatistics(state, gameState);

  return gameState;
}

export function updatePlayer(state: GameState, id: number) {
  var gameState: GameState = { ...state };
  gameState.ticksWaitingById = gameState.ticksWaitingById.slice();

  while (gameState.ticksWaitingById[id] < 1){
    gameState = doPlayerAction(gameState, id);
    gameState.ticksWaitingById[id] += gameState.playersById[id].speed;
  }

  gameState.ticksWaitingById[id] -= 1;

  return gameState;
}


function doPlayerAction(state: GameState, id: number){
  var gameState: GameState = { ...state };  
  var playersById: Player[] = gameState.playersById.slice();
  var tailsById: Point[][] = gameState.tailsById.slice();
  var player: Player = { ...playersById[id] };
  var tail: Point[] = tailsById[id].slice();

  tailsById[id] = tail;
  gameState.playersById = playersById;
  gameState.tailsById = tailsById;
  gameState.fieldOccupiers = gameState.fieldOccupiers.slice();

  // move player
  player.direction = player.nextDirection;
  player = movePlayer(player);

  // if he is out of bounds, kill him and return (if player is AI, just wait)
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
    gameState.fieldOccupiers[pX] = gameState.fieldOccupiers[pX].slice();
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
    state: player.deathPenalty === Infinity ? 'eliminated' : 'dead',
    deaths: player.deaths + 1
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
    if (newState.fieldOccupiers.length >= t.X && newState.fieldOccupiers[t.X].length >= t.Y){
      newState.fieldOccupiers[t.X][t.Y] = -1;      
    }
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

function fieldsStatistics(oldState: GameState, newState: GameState): GameState{

  if (allPlayersAreEliminated(newState.playersById, newState.activePlayers)) {
    return {...newState, gamePhase: 'endGame', currentTick: newState.endTime};
  }

  if (newState.fieldColors === oldState.fieldColors) {
    return newState;
  }

  var gameState = {...newState};
  
  let colors: {[c: number]: any} = colorsOnMap(newState.fieldColors);
  for (let i = 0; i < gameState.activePlayers; i++){
    if (!(colors.hasOwnProperty(gameState.playersById[i].color))) {

      gameState = eliminateFromTheGame(gameState, i);
    }   
  }

  if (allFieldsHaveOneColor(gameState.fieldColors)) {
    gameState = {...gameState, gamePhase: 'endGame', currentTick: gameState.endTime};
  }

  return gameState;
}

function allFieldsHaveOneColor(fields: number[][]): boolean{
  let prevColor = fields[0][0];
  for (let i = 0; i < fields.length; i++){
    for (let j = 0; j < fields[i].length; j++){
      if (fields[i][j] !== prevColor){
        return false;
      }
      prevColor = fields[i][j];
    }      
  }
  return true;
}

function colorsOnMap(fields: number[][]): {[c: number]: any}{
  let colors: {[c: number]: any} = {};
  
  for (let i = 0; i < fields.length; i++){
    for (let j = 0; j < fields[i].length; j++){
      if (!(colors.hasOwnProperty(fields[i][j]))){
        colors[fields[i][j]] = {};
      }
    }      
  }
  return colors;
}

function eliminateFromTheGame(state: GameState, id: number){
  let gameState = {...state};
  gameState.playersById = gameState.playersById.slice();
  gameState.ticksWaitingById = gameState.ticksWaitingById.slice();

  gameState.ticksWaitingById[id] = Infinity;

  let player = {...gameState.playersById[id]};
  player = {
    ...player,
    coords: { ...player.startCoords },
    state: 'eliminated',
    deaths: player.deaths + 1
  };
  gameState.playersById[id] = player;

  return gameState;
}

function allPlayersAreEliminated(players: Player[], amount: number){
  for (let i = 0; i < amount; i++){
    if (players[i].state !== 'eliminated'){
      return false;
    }
  }
  return true;
}