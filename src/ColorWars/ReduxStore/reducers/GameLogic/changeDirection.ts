import { GameState } from '../../../utils/objectTypes';

export function changeDirection(state: GameState, id: number, direction: string) {
  
  if (state.gamePhase !== 'running') {
    return state;
  }

  var gameState: GameState = { ...state };
  gameState.playersById = gameState.playersById.slice();

  if (
    PlayerIsAllowedToTurn(
        direction,
        gameState.playersById[id].direction,
        gameState.playersById[id].state
    )
  ) {
    gameState.playersById[id] = {
      ...gameState.playersById[id],
      nextDirection: direction
    };
  }
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
    // player would eat his own tail it he reverted while attacking
    if (oldState !== 'offensive' || oldDir !== reverseDirections[newDir]) {
      return true;
    }
  }
  return false;
}