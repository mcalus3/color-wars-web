import { Point } from "../utils/objectTypes";
import { addPoints, getNeighborsPoints, PointsAreEqual, FRAMES_PER_SEC } from '../utils/functions';

export function trimPointToBoard(point: Point, dim: Point, precision: number): Point{
  var newPoint = {...point};
  
  if (point.X < precision){
    newPoint.X = precision;
  }
  if (point.Y < precision){
    newPoint.Y = precision;
  }
  if (point.X >= dim.X - precision){
    newPoint.X = dim.X - precision - 1;
  }
  if (point.Y >= dim.Y - precision){
    newPoint.Y = dim.Y - precision - 1;
  }

  return newPoint;
}

export function turnRandomLeftOrRight(dir: string): string{
  let rand = Math.round(Math.random());
  if (rand === 0){
    return shiftDirectionLeft(dir);
  } else {
    return shiftDirectionRight(dir);
  }
}

export function shiftDirectionRight(direction: string): string{
  let retDir: string = 'none';
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

export function shiftDirectionLeft(direction: string): string{
  let retDir: string = 'none';
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
  let retDir: string = 'none';
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

export function getFirstPointOfAttack(territory: Point[], coords: Point, size: number): Point{
  let dir = getDirectionToAdjecentEnemyField(coords, territory);
  let vector: Point = vectors[dir];
  return {X: coords.X + vector.X*size, Y: coords.Y + vector.Y*size};
}

export var vectors: {[dir: string]:Point} = {
  'up': {X: 0, Y: -1},
  'down': {X: 0, Y: 1},
  'left': {X: -1, Y: 0},
  'right': {X: 1, Y: 0}
}

export function getDirectionToAdjecentEnemyField(coords: Point, territory: Point[]){
  let dirs = Object.keys(vectors);
  shuffle(dirs);
  for (let i = 0; i < dirs.length; i++){
    let vector = vectors[dirs[i]];
    if(territory.find(p => {return PointsAreEqual(p, (addPoints(coords, vector)))}) === undefined){
      return dirs[i];
    }
  }
  // fail silently
  return dirs[0];
}

export function pointsAreClose(currentPoint: Point, target: Point, precision: number): boolean{
  
  return Math.max(Math.abs(currentPoint.X - target.X), Math.abs(currentPoint.Y - target.Y)) <= precision;
}

export function directionToTarget(currentPoint: Point, target: Point, direction: string): string{
  let retDir = 'none';
  
  if(currentPoint.X > target.X && currentPoint.Y <= target.Y){
    retDir = 'left';
  }else if (currentPoint.X <= target.X && currentPoint.Y < target.Y){
    retDir = 'down';
  }else if (currentPoint.X < target.X && currentPoint.Y >= target.Y){
    retDir = 'right';
  }else if (currentPoint.X >= target.X && currentPoint.Y > target.Y){
    retDir = 'up';
  }

  // turning back is not possibleduring attacking
  if(retDir === reverseDirection(direction)){
     retDir = turnRandomLeftOrRight(retDir);
   }

   return retDir;
}

export function getRandomDirection(){
  let dirs = [
    'up',
    'down',
    'left',
    'right'
  ];

  let rNum = Math.floor(Math.random()*3.99);
  return dirs[rNum];
}

export function calculatePrecision(speed: number, refresh: number): number{
  
  let precision = (refresh/speed)/(1000/FRAMES_PER_SEC);
  return 1 + Math.ceil(precision);
}
  
export function getBorder(fields: number[][], color: number, dim: Point): Point[]{

  return getBorderPoints(getTerritoryPoints(color, fields), dim, fields);
}

export function getAttackedTerritorySize(): number{

  return 5 + Math.floor(Math.random() * 5);
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

  let match: Point[] = [];

  if (allPoints === undefined || allPoints.length === 0){
    return match;
  }

  var color = colors[allPoints[0].X][allPoints[0].Y];
  
  for (var i = 0; i < allPoints.length; i++)
  {
    let curNeighbors = getNeighborsPoints(allPoints[i], dim);
  
    let isOnBorder: boolean = false;

    for (var j = 0; j < curNeighbors.length; j++)
    {
      if (fieldShouldBeClaimed(curNeighbors[j], colors, dim, color)){
        isOnBorder = true;
      }
    }
    if (isOnBorder){
      match.push(allPoints[i]);
    }
  }
  return match;
}

export function getClosestPoint(coords: Point[], curCoord: Point): Point{
  let dists = coords.map((c: Point) => {
    return (Math.abs(c.X - curCoord.X) + Math.abs(c.Y - curCoord.Y)) 
  });
  
  let closestDistIndex = dists.indexOf(Math.min(...dists));
  
  return coords[closestDistIndex];
}

export function getRandomClosePointFromArray(point: Point, arr: Point[], range: number): Point{
  
  let filteredPoints = arr.filter(p => {return Math.abs(p.X - point.X) < range && Math.abs(p.Y - point.Y) < range});

  let randomPoint = filteredPoints[Math.floor(Math.random()*filteredPoints.length)];

  return {...randomPoint};
}

export function fieldShouldBeClaimed(field: Point, colors: number[][], dim: Point, color: number): boolean{
  return colors[field.X][field.Y] !== color &&
  (field.X !== dim.X - 1 || field.Y === dim.Y - 1 || field.X !== 0 || field.Y !== 0)
}

export function shuffle(b: any[]): any[] {
  var j, x, i;
  for (i = b.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = b[i];
      b[i] = b[j];
      b[j] = x;
  }
  return b;
}