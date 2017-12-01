import { Point, GameState, Ai } from "../../../utils/objectTypes";
import { addPoints, getNeighbors, outOfBoard, PointsAreEqual } from '../../../utils/functions';
import { Store } from "redux";
import * as actions from '../../actionTypes';

class AiManager {

  store: Store<GameState>;
  Ais: {[id: number]: Ai};
  fields: number[][];
  public refreshTime = 200;
  
  constructor(store: Store<GameState>){

    this.store = store;
    
    let state: GameState = store.getState();
    this.fields = state.fieldColors;
    this.Ais = {};

    for (let i = 0; i < state.activePlayers; i++){
      if (state.playersById[i].AiControlled){
        this.Ais[i] = createNewAi(state, i);
      }
    }

    store.subscribe(() => this.mapChanged());
  }

  dispatchAiActions(){
    
    this.updateAis();
    
    for (let i = 0; i < Object.keys(this.Ais).length; i++){
      let ai = this.Ais[Object.keys(this.Ais)[i]];
      this.Ais[Object.keys(this.Ais)[i]] = this.dispatchAiAction(ai)
    }
  }

  updateAis(){
    var players = this.store.getState().playersById;
    
    for(let i = 0; i < players.length; i++) {
      if (players[i].AiControlled && this.Ais[i] === undefined && i < this.store.getState().activePlayers){
        this.Ais[i] = createNewAi(this.store.getState(), i);
      }
      
      if (!(players[i].AiControlled) || i >= this.store.getState().activePlayers) {
        delete this.Ais[i];
      }
    }
  }

  mapChanged(){
    
    if(this.store.getState().fieldColors === this.fields){
      return;
    }
    else {
      this.fields = this.store.getState().fieldColors;
    }

    for (let i = 0; i < Object.keys(this.Ais).length; i++){
      let state = this.store.getState();
      let color = state.playersById[Object.keys(this.Ais)[i]].color;
      let territoryBorder: Point[] = shuffle(getBorder(this.fields, color, state.dimension));
      let territory: Point[] = shuffle(getTerritoryPoints(color, this.fields));
      this.Ais[Object.keys(this.Ais)[i]] = {...this.Ais[Object.keys(this.Ais)[i]], territoryBorder, territory};
    }
  }

  dispatchAiAction(ai: Ai): Ai{    
    let curDiff = this.store.getState().playersById[ai.playerId].AiDifficulty;
    if (curDiff === 0){
      return this.noAiDispatch(ai);
        
    } else if (curDiff === 1){
      return this.dumbAiDispatch(ai);
    }
    return ai;
  }

  noAiDispatch(ai: Ai): Ai{
    let dir = getRandomDirection();
    this.store.dispatch(actions.changeDirection(ai.playerId, dir));
    return ai;
  }
  
  dumbAiDispatch(ai: Ai): Ai{
    let player = this.store.getState().playersById[ai.playerId];
    let dim = this.store.getState().dimension;    
    let newAi: Ai = {...ai};
    let precision = calculatePrecision(player.speed, this.refreshTime);

    if (newAi.currentTargets.length === 0){
      newAi.currentTargets = this.setTargets(newAi, player.coords, player.speed, dim, precision);
    }

    if (pointsAreClose(player.coords, newAi.currentTargets[0], precision)){
      newAi.currentTargets = newAi.currentTargets.slice(1);
      if (newAi.currentTargets.length === 0){
        return newAi;
      }
    }
    let dir = directionToTarget(player.coords, newAi.currentTargets[0], player.direction);
    if (dir !== player.direction){
      this.store.dispatch(actions.changeDirection(newAi.playerId, dir));
    }
    return newAi;
  }

  setTargets(ai: Ai, coords: Point, speed: number, dim: Point, precision: number): Point[]{
    let size = getAttackedTerritorySize(speed);

    let targets = [];

    targets[0] = getRandomClosePointFromArray(getClosestPoint(ai.territoryBorder, coords), ai.territoryBorder, precision);
    
    if (outOfBoard(targets[0], dim)){
      targets[0] = trimPointToBoards(targets[0], dim, precision);
    }

    targets[1] = startAttack(ai.territory, targets[0], size);
    
    if (outOfBoard(targets[1], dim)){
      targets[1] = trimPointToBoards(targets[1], dim, precision);
    }

    let turnVector = directions[getRandomLeftOrRight(getAdjecentEnemyFieldDirection(coords, ai.territory))];
    targets[2] = {X: targets[1].X + (turnVector.X*size), Y: targets[1].Y + (turnVector.Y*size)};
    
    if (outOfBoard(targets[2], dim)){
      targets[2] = trimPointToBoards(targets[2], dim, precision);
    }

    targets[3] = getClosestPoint(ai.territoryBorder, targets[2]);

    return targets;
  }
}

export default AiManager;

function trimPointToBoards(point: Point, dim: Point, precision: number): Point{
  var newPoint = {...point};
  
  if (point.X < 0){
    newPoint.X = precision;
  }
  if (point.Y < 0){
    newPoint.Y = precision;
  }
  if (point.X >= dim.X){
    newPoint.X = dim.X - 1 - precision;
  }
  if (point.Y >= dim.Y){
    newPoint.Y = dim.Y - 1 - precision;
  }

  return newPoint;
}

function getRandomLeftOrRight(dir: string): string{
  let rand = Math.round(Math.random());
  if (rand === 0){
    return shiftDirectionLeft(dir);
  } else {
    return shiftDirectionRight(dir);
  }
}

function shiftDirectionRight(direction: string): string{
  let retDir: string = 'up';
  if (direction === 'up'){
    retDir = 'right'
  } else if (direction === 'right'){
    retDir = 'down'
  } else if (direction === 'down'){
    retDir = 'left'
  } else if (direction === 'left'){
    retDir = 'up'
  }
  return retDir;
}

function shiftDirectionLeft(direction: string): string{
  let retDir: string = 'up';
  if (direction === 'up'){
    retDir = 'left'
  } else if (direction === 'right'){
    retDir = 'up'
  } else if (direction === 'down'){
    retDir = 'right'
  } else if (direction === 'left'){
    retDir = 'down'
  }
  return retDir;
}

export function reverseDirection(direction: string): string{
  let retDir: string = 'up';
  if (direction === 'up'){
    retDir = 'down'
  } else if (direction === 'right'){
    retDir = 'left'
  } else if (direction === 'down'){
    retDir = 'up'
  } else if (direction === 'left'){
    retDir = 'right'
  }
  return retDir;
}

function startAttack(territory: Point[], coords: Point, size: number): Point{
  let dir = getAdjecentEnemyFieldDirection(coords, territory);
  let closestEnemyFieldDirection: Point = directions[dir];
  return {X: coords.X + closestEnemyFieldDirection.X*size, Y: coords.Y + closestEnemyFieldDirection.Y*size};
}

var directions: {[dir: string]:Point} = {
  'up': {X: 0, Y: -1},
  'down': {X: 0, Y: 1},
  'left': {X: -1, Y: 0},
  'right': {X: 1, Y: 0}
}

export function getAdjecentEnemyFieldDirection(coords: Point, territory: Point[]){
  let dirs = Object.keys(directions);
  dirs = shuffle(dirs);
  for (let i = 0; i < dirs.length; i++){
    let vector = directions[dirs[i]];
    if(territory.find(p => {return PointsAreEqual(p, (addPoints(coords, vector)))})=== undefined){
      return dirs[i];
    }
  }
  return 'up';
}

function pointsAreClose(currentPoint: Point, target: Point, precision: number): boolean{
  
  return Math.max(Math.abs(currentPoint.X - target.X), Math.abs(currentPoint.Y - target.Y)) <= precision;
}

function directionToTarget(currentPoint: Point, target: Point, direction: string): string{
  let retDir = 'up';
  if(currentPoint.X > target.X && currentPoint.Y <= target.Y){
    retDir = 'left';
  }else if (currentPoint.X <= target.X && currentPoint.Y < target.Y){
    retDir = 'down';
  }else if (currentPoint.X < target.X && currentPoint.Y >= target.Y){
    retDir = 'right';
  }else if (currentPoint.X >= target.X && currentPoint.Y > target.Y){
    retDir = 'up';
  }

  if(retDir === reverseDirection(direction)){
     retDir = shiftDirectionRight(retDir);
   }

   return retDir;
}

function getRandomDirection(){
  let dirs = [
    'up',
    'down',
    'left',
    'right'
  ];
  let rNum = Math.floor(Math.random()*3.9);
  return dirs[rNum];
}

function calculatePrecision(speed: number, refresh: number): number{
  
    return refresh/20/speed;
  }
  
function getBorder(fields: number[][], color: number, dim: Point): Point[]{

  return getBorderPoints(getTerritoryPoints(color, fields), dim, fields);
}

export function getAttackedTerritorySize(speed: number): number{
    return Math.floor(20/speed);
  }
  
export function getTerritoryPoints(color: number, colorsArr: number[][]): Point[]{
  let points: Point[] = [];

  for (let i = 0; i < colorsArr.length; i++) {
    for (let j = 0; j < colorsArr[0].length; j++) {
      if (colorsArr[i][j] === color) {
        points.push({X: i, Y: j});
      }
    }
  }

  return points;
}

export function getBorderPoints(allPoints: Point[], dim: Point, colors: number[][]): Point[]{

  let borderPoints: Point[] = allPoints.filter((p: Point) => {
    
    let curNeighbors = getNeighbors(p, dim);
    
    let differentNeighbors: Point[] = curNeighbors.filter((n: Point) => {
      
      return colors[n.X][n.Y] !== colors[p.X][p.Y];
    });
    return differentNeighbors.length !== 0;
  });

  return borderPoints;
}

export function getClosestPoint(coords: Point[], curCoord: Point): Point{
  let dists = shuffle(coords).map((c: Point) => {
    return (Math.abs(c.X - curCoord.X) + Math.abs(c.Y - curCoord.Y)) 
  });
  
  let closestDistIndex = dists.indexOf(Math.min(...dists));
  
  return coords[closestDistIndex];
}

export function getRandomClosePointFromArray(point: Point, arr: Point[], precision: number): Point{
  
  let filtered = shuffle(arr).filter(p => {return Math.abs(p.X - point.X) < precision || Math.abs(p.Y - point.Y) < precision});

  return {...filtered[Math.floor(Math.random()*filtered.length)]};
}

function shuffle(b: any[]): any[] {
  let a = b.slice();
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function createNewAi(state: GameState, id: number): Ai{
  let border: Point[] = getBorder(state.fieldColors, state.playersById[id].color, state.dimension);

  return {
    playerId: id,
    territoryBorder: border,
    stepsDone: 0,
    currentTargets: [],
    territory: getTerritoryPoints(state.playersById[id].color, state.fieldColors),
    currentAction: 'inside'
  };
}