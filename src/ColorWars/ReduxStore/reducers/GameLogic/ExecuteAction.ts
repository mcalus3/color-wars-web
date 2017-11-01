import { GameState } from "../../../utils/objectTypes";

export function ExecuteAction(state: GameState, key: number){
  
  if(state.currentTick >= state.endTime){
    return state;
  }

  var gameState: GameState = {...state};
  gameState.playersByName = {...gameState.playersByName};

  gameState.playerNames.slice(0, gameState.activePlayers).forEach(name => {
    var mapping = gameState.playersByName[name].keyMapping;
    if (key in mapping){
      if (PlayerIsAllowedToTurn(mapping[key], gameState.playersByName[name].direction, gameState.playersByName[name].state))
      gameState.playersByName[name] = {...gameState.playersByName[name], direction: mapping[key]};
    }

});

  return gameState;
}

var reverseDirections: {[dir: string]: string} = {
  'up': 'down',
  'down': 'up',
  'left': 'right',
  'right': 'left'
};

function PlayerIsAllowedToTurn(newDir: string, oldDir: string, oldState: string): boolean{
  if (newDir !== oldDir){
    if (oldState !== 'offensive' || oldDir !== reverseDirections[newDir]){
      return true;
    }
  }
  return false;
};