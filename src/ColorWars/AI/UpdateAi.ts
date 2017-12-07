import { Point, GameState, Ai, Player } from "../utils/objectTypes";
import { outOfBoard } from '../utils/functions';
import { getRandomDirection, pointsAreClose, directionToTarget, getAttackedTerritorySize, getRandomClosePointFromArray, getClosestPoint, getFirstPointOfAttack, turnRandomLeftOrRight, getAdjecentEnemyFieldDirection, trimPointToBoard, directions } from "./AiFunctions";

export function UpdateAiDirection(ai: Ai, state: GameState): Ai{
  let curDiff = state.playersById[ai.playerId].AiDifficulty;

  if (curDiff === 0){
    return noAiUpdateDirection(ai);
      
  } else if (curDiff === 1){
    return dumbAiUpdateDirection(ai, state);
  }
  return ai;
}

export function noAiUpdateDirection(ai: Ai): Ai{
  return {...ai, currentDirection: getRandomDirection()};
}

export function dumbAiUpdateDirection(ai: Ai, state: GameState): Ai{
  let player = state.playersById[ai.playerId];
  let dim = state.dimension;
  let newAi: Ai = {...ai};

  if (shouldSetNewTarget(newAi, player)){
    newAi.currentTargets = setTargets(newAi, player.coords, player.speed, dim, newAi.precision);
  }

  if (pointsAreClose(player.coords, newAi.currentTargets[0], newAi.precision)){

    // If player has only one point (is returning), but are not already on his own territory, don't pop this target yet
    if (newAi.currentTargets.length !== 1 || player.state === 'defensive'){
      newAi.currentTargets = newAi.currentTargets.slice(1);
    }

    if (newAi.currentTargets.length === 0){
      return newAi;
    }
  }

  newAi.currentDirection = directionToTarget(player.coords, newAi.currentTargets[0], player.direction);
  return newAi;
}

export function shouldSetNewTarget(ai: Ai, player: Player): boolean{
  
  // If player don't have any target
  if (ai.currentTargets.length === 0) {
    return true;    
  }
  
  // If player has died
  if (ai.PlayerHasDied) {
    return true;    
  }

  // If player hasnt moved
  if (ai.playerHasntMoved) {
    return true;    
  }

  // If player is returning and already on his own territory
  if (ai.currentTargets.length < 3 && player.state === 'defensive'){
    return true;    
  }

  return false;    
}

export function setTargets(ai: Ai, coords: Point, speed: number, dim: Point, precision: number): Point[]{
  if(ai.territoryBorder.length === 0){
    return [{...coords}];
  }
  
  let size = getAttackedTerritorySize(speed);

  let targets = [];

  targets[0] = getRandomClosePointFromArray(getClosestPoint(ai.territoryBorder, coords), ai.territoryBorder, precision);
  
  targets[1] = getFirstPointOfAttack(ai.territory, targets[0], size);
  
  let turnVector = directions[turnRandomLeftOrRight(getAdjecentEnemyFieldDirection(coords, ai.territory))];
  targets[2] = {X: targets[1].X + (turnVector.X*size), Y: targets[1].Y + (turnVector.Y*size)};
  
  targets[3] = getClosestPoint(ai.territoryBorder, targets[2]);

  for(let i = 0; i < targets.length ; i++){
    if (outOfBoard(targets[i], dim)){
      targets[i] = trimPointToBoard(targets[i], dim);
    }
  }

  return targets;
}