import { GameState } from '../../../utils/objectTypes';

export function ExecuteAction(state: GameState, key: number) {
  if (state.currentTick >= state.endTime) {
    return state;
  }

  var gameState: GameState = { ...state };
  gameState.playersById = gameState.playersById.slice();

  for(let i = 0; i < gameState.activePlayers; i++){
    var mapping = gameState.keyMappingsById[i];
    if (key in mapping) {
      if (
        PlayerIsAllowedToTurn(
          mapping[key],
          gameState.playersById[i].direction,
          gameState.playersById[i].state
        )
      ) {
        gameState.playersById[i] = {
          ...gameState.playersById[i],
          nextDirection: mapping[key]
        };
      }
    }
  };

  return gameState;
}

var reverseDirections: { [dir: string]: string } = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

function PlayerIsAllowedToTurn(
  newDir: string,
  oldDir: string,
  oldState: string
): boolean {
  if (newDir !== oldDir) {
    if (oldState !== 'offensive' || oldDir !== reverseDirections[newDir]) {
      return true;
    }
  }
  return false;
}
