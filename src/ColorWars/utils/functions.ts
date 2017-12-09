import { Point } from './objectTypes';

export function get2DCoords(dimension: Point): Point[] {
  var fields: Point[] = [];

  for (var x: number = 0; x < dimension.X; x++) {
    for (var y: number = 0; y < dimension.Y; y++) {
      fields[x * dimension.Y + y] = { X: x, Y: y };
    }
  }

  return fields;
}

export function addPoints(p1: Point, p2: Point): Point {
  return { X: p1.X + p2.X, Y: p1.Y + p2.Y };
}

export function multiplyPoint(p1: Point, m: number): Point {
  return { X: p1.X * m, Y: p1.Y * m };
}

export function PointsAreEqual(p1: Point, p2: Point): boolean {
  return p1.X === p2.X && p1.Y === p2.Y;
}

export function layouter(
  boardDimension: Point,
  canvasDimension: Point,
  fieldLocation: Point
) {
  return {
    X: canvasDimension.X / boardDimension.X * fieldLocation.X,
    Y: canvasDimension.Y / boardDimension.Y * fieldLocation.Y,
    Width: canvasDimension.X / boardDimension.X,
    Height: canvasDimension.Y / boardDimension.Y
  };
}

export var colorNumToName = {
  1: 'green',
  2: 'blue',
  16777215: 'white',
  8421504: 'grey',
  3: 'orange',
  4: 'red',
  5: 'Brown',
  6: 'CadetBlue',
  7: 'Chartreuse',
  8: 'DarkGoldenRod'
};

export var colorNameToNum = {
  green: 1,
  blue: 2,
  white: 16777215,
  grey: 8421504
};

export function ArrayHasCoords(coords: Point, arr: Point[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].X === coords.X && arr[i].Y === coords.Y) {
      return true;
    }
  }
  return false;
}

export function OptimizedArrayHasCoords(coords: Point, arr: boolean[][]): boolean {
  
  if (arr[coords.X] !== undefined){
    if (arr[coords.X][coords.Y] === true) {
      return true;
    }  
  }
  return false;
}

export function getCanvasDimension(dim: Point, mobile: boolean): Point {
  var canvasDimension: Point = { X: 0, Y: 0 };

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  w = w * 3 / 4;
  if (!mobile){
    h = h - 75;    
  }
  
  const boardRatio: number = dim.X / dim.Y;

  if (w / h > boardRatio) {
    canvasDimension.Y = h;
    canvasDimension.X = canvasDimension.Y * boardRatio;
  } else {
    canvasDimension.X = w;
    canvasDimension.Y = canvasDimension.X / boardRatio;
  }

  canvasDimension.X = Math.floor(canvasDimension.X / dim.X) * dim.X;
  canvasDimension.Y = Math.floor(canvasDimension.Y / dim.Y) * dim.Y;

  return canvasDimension;
}

export function getViewPort(): Point {
  var w = Math.max(document.documentElement.clientWidth || 0);
  var h = Math.max(document.documentElement.clientHeight || 0);
  return { X: w, Y: h };
}

export function createHistogram(
  fields: number[][]
): { colorsArr: number[]; valuesArr: number[] } {
  var colors: {} = {};
  fields.forEach(row => {
    row.forEach(element => {
      if (element === colorNameToNum.white) {
        return;
      }
      if (colors.hasOwnProperty(element)) {
        colors[element] += 1;
      } else {
        colors[element] = 1;
      }
    });
  });

  var colorsArr: number[] = Object.keys(colors).map((n: string) => parseInt(n, 10));
  colorsArr.sort(function(a: number, b: number) {
    return parseFloat(colors[b]) - parseFloat(colors[a]);
  });
  var valuesArr = colorsArr.map((color: number) => colors[color]);
  return { colorsArr, valuesArr };
}

export function outOfBoard(coords: Point, dimension: Point): boolean {
  return (
    coords.X < 0 ||
    coords.Y < 0 ||
    coords.X >= dimension.X ||
    coords.Y >= dimension.Y
  );
}

export function swap(json: any): any {
  var ret = {};
  Object.keys(json).forEach((key: string) => {
    ret[json[key]] = key;
  });
  return ret;
}

export function getFontSize(canvasWidth: number) {
  var ratio = 1 / 10; // calc ratio
  var size = canvasWidth * ratio; // get font size based on current width
  return size || 0; // set font
}

export function getNeighbors(p: Point, d: Point): Point[] {
  var neighbors: Point[] = [];
  if (p.Y !== 0){
    neighbors.push({ X: p.X, Y: p.Y - 1 });
  }
  if (p.X !== 0){
    neighbors.push({ X: p.X - 1, Y: p.Y });
  }
  if (p.X !== d.X - 1){
    neighbors.push({ X: p.X + 1, Y: p.Y });
  }
  if (p.Y !== d.Y - 1){
    neighbors.push({ X: p.X, Y: p.Y + 1 });
  }

  return neighbors;
}

export function copy2dBoard(inArr: any[][]): any[][] {
  var newArr: any[][] = inArr.slice();
  var i = inArr.length;
  while (i--) {
    newArr[i] = inArr[i].slice();
  }
  return newArr;
}

export const FRAMES_PER_SEC = 10;