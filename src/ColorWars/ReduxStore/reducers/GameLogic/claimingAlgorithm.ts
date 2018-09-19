import {
  OptimizedArrayHasCoords,
  getNeighborsPoints,
  ArrayHasCoords
} from '../../../utils/functions';
import { Point } from '../../../utils/objectTypes';

export function claimTerritoryAlgorithm(
  tail: Point[],
  fields: number[][],
  color: number
): Point[] {
  if (tail.length === 0) {
    return [];
  }

  var dimension: Point = { X: fields.length, Y: fields[0].length };

  var tailNeighbours: Point[] = [];
  var outerNeighbours: boolean[][] = [];
  var claimedFields: boolean[][] = createClaimedFields(fields, color);
  var returnFields: Point[] = [];

  for (let i: number = 0; i < fields.length; i++) {
    outerNeighbours[i] = [];
  }

  for (let i: number = 0; i < tail.length; i++) {
    let t: Point = tail[i];

    claimedFields[t.X][t.Y] = true;
    returnFields.push(t);
    let neigh = getNeighborsPoints(t, dimension);

    for (let j: number = 0; j < neigh.length; j++) {
      if (
        !OptimizedArrayHasCoords(neigh[j], claimedFields) &&
        !ArrayHasCoords(neigh[j], tailNeighbours)
      ) {
        tailNeighbours.push(neigh[j]);
      }
    }
  }

  for (let i: number = 0; i < tailNeighbours.length; i++) {
    // check for performance boost (won't start algorithm for fields already classified as outer or taken,
    // so most of the cases algorithm will run only twice)
    if (
      !OptimizedArrayHasCoords(tailNeighbours[i], claimedFields) &&
      !OptimizedArrayHasCoords(tailNeighbours[i], outerNeighbours)
    ) {
      // this is one area of adjecent, not taken fields
      var joinedArea: boolean[][] = [];
      // algorithm returns bool value indicating if any of the fields in joined area aren't at the edge of a map
      var joinedAreaIsInside: boolean = ClaimTerritoryRecursive(
        tailNeighbours[i],
        outerNeighbours,
        joinedArea,
        claimedFields,
        dimension
      );
      if (joinedAreaIsInside) {
        // if so, joined area is inside players' terrain
        claimedFields = MergeOptimizedTables(claimedFields, joinedArea);
        returnFields = returnFields.concat(ChangeOptimizedToNormal(joinedArea));
      }
    }
  }
  return returnFields;
}

function ClaimTerritoryRecursive(
  currentField: Point,
  outerNeighbours: boolean[][],
  joinedArea: boolean[][],
  claimedFields: boolean[][],
  dimension: Point
): boolean {
  joinField(joinedArea, currentField);

  var currentNeighbors: Point[] = getNeighborsPoints(currentField, dimension);
  if (currentNeighbors.length !== 4) {
    outerNeighbours.push.apply(joinedArea);
    return false;
  }
  // For each of neighbours that arent in joined area list and does not belong to player make recurrent call
  var eachNeighbourReturnsTrue: boolean = true;

  for (let i: number = 0; i < currentNeighbors.length; i++) {
    if (!eachNeighbourReturnsTrue) {
      break;
    }

    if (
      !OptimizedArrayHasCoords(currentNeighbors[i], claimedFields) &&
      !OptimizedArrayHasCoords(currentNeighbors[i], joinedArea)
    ) {
      if (
        !ClaimTerritoryRecursive(
          currentNeighbors[i],
          outerNeighbours,
          joinedArea,
          claimedFields,
          dimension
        )
      ) {
        eachNeighbourReturnsTrue = false;
      }
    }
  }
  return eachNeighbourReturnsTrue;
}

function ChangeOptimizedToNormal(inArr: boolean[][]) {
  let ret: Point[] = [];

  inArr.forEach((value, index) => {
    let row = index;

    value.forEach((v, i) => {
      if (v === true) {
        ret.push({ X: row, Y: i });
      }
    });
  });

  return ret;
}

function MergeOptimizedTables(arr1: boolean[][], arr2: boolean[][]) {
  let ret: boolean[][] = [];

  arr1.forEach((value, index) => {
    let row = index;

    value.forEach((v, i) => {
      if (v === true) {
        if (ret[row] === undefined) {
          ret[row] = [];
        }

        ret[row][i] = true;
      }
    });
  });

  arr2.forEach((value, index) => {
    let row = index;

    value.forEach((v, i) => {
      if (v === true) {
        if (ret[row] === undefined) {
          ret[row] = [];
        }

        ret[row][i] = true;
      }
    });
  });

  return ret;
}

function createClaimedFields(fields: number[][], color: number) {
  let claimedFields: boolean[][] = [];

  for (let i: number = 0; i < fields.length; i++) {
    claimedFields[i] = [];

    for (let j: number = 0; j < fields[i].length; j++) {
      if (fields[i][j] === color) {
        claimedFields[i][j] = true;
      }
    }
  }

  return claimedFields;
}

function joinField(joinedArea: boolean[][], field: Point) {
  if (joinedArea[field.X] === undefined) {
    joinedArea[field.X] = [];
  }
  joinedArea[field.X][field.Y] = true;
}
