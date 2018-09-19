import { Point } from './objectTypes';
import { getTerritoryPoints, getClosestPoint } from '../AI/AiFunctions';

export const FRAMES_PER_SEC = 10;

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
    X: (canvasDimension.X / boardDimension.X) * fieldLocation.X,
    Y: (canvasDimension.Y / boardDimension.Y) * fieldLocation.Y,
    Width: canvasDimension.X / boardDimension.X,
    Height: canvasDimension.Y / boardDimension.Y
  };
}

export function ArrayHasCoords(coords: Point, arr: Point[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (PointsAreEqual(arr[i], coords)) {
      return true;
    }
  }
  return false;
}

export function OptimizedArrayHasCoords(
  coords: Point,
  arr: boolean[][]
): boolean {
  if (arr[coords.X] !== undefined) {
    if (arr[coords.X][coords.Y] === true) {
      return true;
    }
  }
  return false;
}

export function getDimensionForGameBoard(dim: Point, mobile: boolean): Point {
  var canvasDimension: Point = { X: 0, Y: 0 };

  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  h = h - 88;

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

export function getDimensionForScoreBoard(dim: Point, mobile: boolean): Point {
  return {
    X: getDimensionForGameBoard(dim, mobile).X,
    Y: 44
  };
}

export function createHistogram(
  fields: number[][],
  sorted: boolean = true
): { colorsArr: number[]; valuesArr: number[] } {
  var colors: {} = {};

  fields.forEach(row => {
    row.forEach(element => {
      if (element === COLOR_NUMS.White) {
        return;
      }

      if (colors.hasOwnProperty(element)) {
        colors[element] += 1;
      } else {
        colors[element] = 1;
      }
    });
  });

  var colorsArr: number[] = Object.keys(colors).map((n: string) =>
    parseInt(n, 10)
  );

  if (sorted) {
    colorsArr.sort(function(a: number, b: number) {
      return parseFloat(colors[b]) - parseFloat(colors[a]);
    });
  }

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
  return canvasWidth / 10;
}

export function getNeighborsPoints(p: Point, d: Point): Point[] {
  var neighbors: Point[] = [];

  if (p.Y !== 0) {
    neighbors.push({ X: p.X, Y: p.Y - 1 });
  }
  if (p.X !== 0) {
    neighbors.push({ X: p.X - 1, Y: p.Y });
  }
  if (p.X !== d.X - 1) {
    neighbors.push({ X: p.X + 1, Y: p.Y });
  }
  if (p.Y !== d.Y - 1) {
    neighbors.push({ X: p.X, Y: p.Y + 1 });
  }

  return neighbors;
}

export function getClosestPointOfColor(
  point: Point,
  color: number,
  fields: number[][]
) {
  return getClosestPoint(getTerritoryPoints(color, fields), point);
}

export function getRotation(dir: string) {
  return dir === 'right' ? 90 : dir === 'down' ? 180 : dir === 'left' ? 270 : 0;
}

export var COLORS: string[] = [
  'White',
  'Green',
  'Blue',
  'Orange',
  'Red',
  'Brown',
  'CadetBlue',
  'Chartreuse',
  'DarkGoldenRod',
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'BlueViolet',
  'BurlyWood',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'Darkorange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen'
];

export var COLOR_NUMS = {
  White: 0,
  Green: 1,
  Blue: 2,
  Orange: 3,
  Red: 4,
  Brown: 5,
  CadetBlue: 6,
  Chartreuse: 7,
  DarkGoldenRod: 8,
  AliceBlue: 9,
  AntiqueWhite: 10,
  Aqua: 11,
  Aquamarine: 12,
  Azure: 13,
  Beige: 14,
  Bisque: 15,
  Black: 16,
  BlanchedAlmond: 17,
  BlueViolet: 18,
  BurlyWood: 19,
  Chocolate: 20,
  Coral: 21,
  CornflowerBlue: 22,
  Cornsilk: 23,
  Crimson: 24,
  Cyan: 25,
  DarkBlue: 26,
  DarkCyan: 27,
  DarkGray: 28,
  DarkGrey: 29,
  DarkGreen: 30,
  DarkKhaki: 31,
  DarkMagenta: 32,
  DarkOliveGreen: 33,
  Darkorange: 34,
  DarkOrchid: 35,
  DarkRed: 36,
  DarkSalmon: 37,
  DarkSeaGreen: 38,
  DarkSlateBlue: 39,
  DarkSlateGray: 40,
  DarkSlateGrey: 41,
  DarkTurquoise: 42,
  DarkViolet: 43,
  DeepPink: 44,
  DeepSkyBlue: 45,
  DimGray: 46,
  DimGrey: 47,
  DodgerBlue: 48,
  FireBrick: 49,
  FloralWhite: 50,
  ForestGreen: 51,
  Fuchsia: 52,
  Gainsboro: 53,
  GhostWhite: 54,
  Gold: 55,
  GoldenRod: 56,
  Gray: 57,
  Grey: 58,
  GreenYellow: 59,
  HoneyDew: 60,
  HotPink: 61,
  IndianRed: 62,
  Indigo: 63,
  Ivory: 64,
  Khaki: 65,
  Lavender: 66,
  LavenderBlush: 67,
  LawnGreen: 68,
  LemonChiffon: 69,
  LightBlue: 70,
  LightCoral: 71,
  LightCyan: 72,
  LightGoldenRodYellow: 73,
  LightGray: 74,
  LightGrey: 75,
  LightGreen: 76,
  LightPink: 77,
  LightSalmon: 78,
  LightSeaGreen: 79,
  LightSkyBlue: 80,
  LightSlateGray: 81,
  LightSlateGrey: 82,
  LightSteelBlue: 83,
  LightYellow: 84,
  Lime: 85,
  LimeGreen: 86,
  Linen: 87,
  Magenta: 88,
  Maroon: 89,
  MediumAquaMarine: 90,
  MediumBlue: 91,
  MediumOrchid: 92,
  MediumPurple: 93,
  MediumSeaGreen: 94,
  MediumSlateBlue: 95,
  MediumSpringGreen: 96,
  MediumTurquoise: 97,
  MediumVioletRed: 98,
  MidnightBlue: 99,
  MintCream: 100,
  MistyRose: 101,
  Moccasin: 102,
  NavajoWhite: 103,
  Navy: 104,
  OldLace: 105,
  Olive: 106,
  OliveDrab: 107,
  OrangeRed: 108,
  Orchid: 109,
  PaleGoldenRod: 110,
  PaleGreen: 111,
  PaleTurquoise: 112,
  PaleVioletRed: 113,
  PapayaWhip: 114,
  PeachPuff: 115,
  Peru: 116,
  Pink: 117,
  Plum: 118,
  PowderBlue: 119,
  Purple: 120,
  RosyBrown: 121,
  RoyalBlue: 122,
  SaddleBrown: 123,
  Salmon: 124,
  SandyBrown: 125,
  SeaGreen: 126,
  SeaShell: 127,
  Sienna: 128,
  Silver: 129,
  SkyBlue: 130,
  SlateBlue: 131,
  SlateGray: 132,
  SlateGrey: 133,
  Snow: 134,
  SpringGreen: 135,
  SteelBlue: 136,
  Tan: 137,
  Teal: 138,
  Thistle: 139,
  Tomato: 140,
  Turquoise: 141,
  Violet: 142,
  Wheat: 143,
  WhiteSmoke: 144,
  Yellow: 145,
  YellowGreen: 146
};
