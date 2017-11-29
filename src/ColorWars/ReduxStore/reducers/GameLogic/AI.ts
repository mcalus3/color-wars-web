import { Point, GameState, Ai } from "../../../utils/objectTypes";
import { getNeighbors } from "../../../utils/functions";
import { Store } from "redux";
import * as actions from '../../actionTypes';

class AiManager {

  store: Store<GameState>;
  Ais: {[id: number]: Ai};
  fields: number[][];

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
      let border: Point[] = getBorder(this.fields, color, state.dimension);
      this.Ais[Object.keys(this.Ais)[i]] = {...this.Ais[Object.keys(this.Ais)[i]], territoryBorder: border};
    }
  }

  dispatchAiAction(ai: Ai): Ai{    
    let newAi: Ai = {...ai};
    let dir = getDirection();
    this.store.dispatch(actions.changeDirection(ai.playerId, dir));
    return newAi;
  }
}

export default AiManager;

function getDirection(){
  let dirs = [
    'up',
    'down',
    'left',
    'right'
  ];
  let rNum = Math.floor(Math.random()*3.9);
  return dirs[rNum];
}

function getBorder(fields: number[][], color: number, dim: Point): Point[]{

  return getBorderPoints(getTerritoryPoints(color, fields), dim, fields);
}

function createNewAi(state: GameState, id: number): Ai{
  let border: Point[] = getBorder(state.fieldColors, state.playersById[id].color, state.dimension);

  return {
    playerId: id,
    territoryBorder: border,
    setpsDone: 0
  };
}

export function getAttackedTerritorySize(speed: number): number{
    return 20/speed;
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
  let dists = coords.map((c: Point) => {
    return (Math.abs(c.X - curCoord.X) + Math.abs(c.Y - curCoord.Y)) 
  });
  
  let closestDistIndex = dists.indexOf(Math.min(...dists));
  
  return coords[closestDistIndex];
}

export function getClosestDistance(coords: Point[], curCoord: Point): number{
  let dists = coords.map((c: Point) => {
    return (Math.abs(c.X - curCoord.X) + Math.abs(c.Y - curCoord.Y)) 
  });
  return Math.min(...dists);
}

export function getRandomClosePoint(p: Point): Point{
  let rand1 = Math.round(Math.random()*4) - 2;
  let rand2 = Math.round(Math.random()*4) - 2;
  return {X: p.X + rand1, Y: p.Y + rand2};
}