import { ArrayHasCoords, getNeighbors } from '../../../utils/functions';
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
  var outerNeighbours: Point[] = [];
  var claimedFields: Point[] = [];
  var returnFields: Point[] = [];

  for (let i: number = 0; i < fields.length; i++) {
    var row = i;
    for (let j: number = 0; j < fields[i].length; j++) {
      if (fields[i][j] === color) {
        claimedFields.push({ X: row, Y: j });
      }
    }
  }

  for (let i: number = 0; i < tail.length; i++) {
    claimedFields.push(tail[i]);
    returnFields.push(tail[i]);
    let neigh = getNeighbors(tail[i], dimension);
    for (let j: number = 0; j < neigh.length; j++) {
      if (
        !ArrayHasCoords(neigh[j], claimedFields) &&
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
      !ArrayHasCoords(tailNeighbours[i], claimedFields) &&
      !ArrayHasCoords(tailNeighbours[i], outerNeighbours)
    ) {
      // this is one area of adjecent, not taken fields
      var joinedArea: Point[] = [];
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
        claimedFields = claimedFields.concat(joinedArea.concat(tail));
        returnFields = returnFields.concat(joinedArea.concat(tail));
      }
    }
  }
  return returnFields;
}

function ClaimTerritoryRecursive(
  currentField: Point,
  outerNeighbours: Point[],
  joinedArea: Point[],
  claimedFields: Point[],
  dimension: Point
): boolean {
  joinedArea.push(currentField);

  var currentNeighbors: Point[] = getNeighbors(currentField, dimension);
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
      !ArrayHasCoords(currentNeighbors[i], claimedFields) &&
      !ArrayHasCoords(currentNeighbors[i], joinedArea)
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
