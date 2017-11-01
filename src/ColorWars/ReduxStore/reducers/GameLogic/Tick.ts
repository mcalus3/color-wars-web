import { copy2dBoard, outOfBoard } from '../../../utils/functions';
import { GameState, Player, PlayerByName, Point, TailByName } from '../../../utils/objectTypes';
import { claimTerritoryAlgorithm } from './claimingAlgorithm';
import { claimFields } from './CreateWorld';

export function Tick(state: GameState){

  // handle pause
  if (state.gameState === 'paused'){
    return state;
  }

  var gameState: GameState = {...state};
  
  if (gameState.gameState === 'initializing'){
    gameState.gameState = 'running';
  }

  // check if the game should end already
  if (gameState.currentTick >= gameState.endTime){
    gameState = {...gameState, gameState: 'endGame'};
    return gameState;
  } else {
    gameState = {...gameState, currentTick: gameState.currentTick + 1};
  }

  // clear last updated coords table
  if(gameState.lastUpdatedCoords.length !== 0){
    gameState.lastUpdatedCoords = [];
  }

  // update game for every active player
  gameState
  .playerNames
  .slice(0, gameState.activePlayers)
  .forEach(name =>
    gameState = updatePlayer(gameState, name)
  );

  return gameState;
}

export function updatePlayer(state: GameState, name: string){
   
  var gameState: GameState = {...state};

  // player movement is executed once per couple of ticks
  if(gameState.ticksWaitingByName[name] > 0){
    
    gameState.ticksWaitingByName[name] -= 1;
        
    return gameState;
  }
    
  var playersByName: PlayerByName = {...gameState.playersByName};
  var tailsByName: TailByName = {...gameState.tailsByName};
  var player: Player = {...playersByName[name]};
  var tail: Point[] = tailsByName[name].slice();
  var pX = player.coords.X;
  var pY = player.coords.Y;

  playersByName[name] = player;
  tailsByName[name] = tail;
  gameState.playersByName = playersByName;
  gameState.tailsByName = tailsByName;
  gameState.fieldOccupiers = copy2dBoard(gameState.fieldOccupiers);

  //set next waiting period
  gameState.ticksWaitingByName = {...gameState.ticksWaitingByName};
  gameState.ticksWaitingByName[name] = gameState.playersByName[name].speed - 1;

  // if player is on enemy territory spawn tail
  if(gameState.fieldColors[pX][pY] !== player.color){
    player.state = 'offensive';
    tail.push({...player.coords});
    
    // and register it for collision detection
    gameState.fieldOccupiers[pX][pY] = player.name;
  }
  
  // move player
  player = movePlayer(player);
  gameState.playersByName[name] = player;

  // if he is out of bounds, kill him and return
  if (outOfBoard(player.coords, gameState.dimension)){
    return killPlayer(gameState, name);
  }
  
  // if player is on his own territory, claim fields, delete tail and unregister from collision detector
  if(gameState.fieldColors[pX][pY] === player.color && player.state === 'offensive'){
    player.state = 'defensive';
    var claimedPoints: Point[] = claimTerritoryAlgorithm(tail, gameState.fieldColors, player.color);
    gameState = claimFields(gameState, claimedPoints, player.color);
    
    gameState = killTail(gameState, name);
  }

  // kill enemy tail on entered field
  gameState = EnterField(gameState, player.coords);
  
  return gameState;
};

export function killPlayer(state: GameState, name: string): GameState{
  var newState = killTail(state, name);
  newState.playersByName = {...newState.playersByName};
  newState.ticksWaitingByName = {...newState.ticksWaitingByName};
  var player = newState.playersByName[name];

  newState.playersByName[name] = {...player, coords: {...player.startCoords}, state: 'dead'};
  newState.ticksWaitingByName[name] = player.deathPenalty;

  return newState;
}

export function killTail(state: GameState, name: string): GameState{
  var newState: GameState = {...state,
     tailsByName: {...state.tailsByName},
     fieldOccupiers: copy2dBoard(state.fieldOccupiers)
    };

  newState.tailsByName[name].forEach((t) => {
    newState.fieldOccupiers[t.X][t.Y] = '';
  });
  newState.tailsByName[name] = [];
  return newState;
};

function movePlayer(player: Player): Player{
  player = {...player, coords: {...player.coords}};

  switch(player.direction){
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
    default: break;
  }
  return player;
}

function EnterField(state: GameState, field: Point): GameState{
  
  var name: string = state.fieldOccupiers[field.X][field.Y];
  if(state.playerNames.indexOf(name) > -1 ){

    return killPlayer(state, name);
  }
  return state;
}