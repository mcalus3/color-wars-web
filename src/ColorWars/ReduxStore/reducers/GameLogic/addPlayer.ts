import { GameState, Player } from "../../../utils/objectTypes";

export function addPlayer(oldState: GameState){
  let index = oldState.playersById.length+1;  
  let player: Player = {
      name: 'Player' + index.toString(),
      direction: 'none',
      coords: { X: 3, Y: 3 },
      state: 'defensive',
      color: index,
      startCoords: { X: 3, Y: 3 },
      speed: 1,
      deathPenalty: 40,
      nextDirection: 'none',
      aiControlled: true,
      aiDifficulty: 1,
      deaths: 0,
      avatar: 0
    };
  let newState: GameState = {...oldState, playersById: oldState.playersById.concat(player)};
  newState = {...newState, tailsById: newState.tailsById.concat([[]])};
  newState = {...newState, keyMappingsById: newState.keyMappingsById.concat({})};
  newState = {...newState, ticksWaitingById: newState.ticksWaitingById.concat(0)};
  return newState;
}