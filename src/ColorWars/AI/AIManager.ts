import { Point, GameState, Ai } from "../utils/objectTypes";
import { Store } from "redux";
import * as actions from '../ReduxStore/actionTypes';
import { calculatePrecision, shuffle, getBorder, getTerritoryPoints } from "./AiFunctions";
import { UpdateAiDirection } from "./UpdateAi";

var store: Store<GameState>;
var Ais: Ai[];
var lastState: GameState;

export var refreshTime = 100;
  
export function createAiManager(s: Store<GameState>){

  store = s;
    
  lastState = store.getState();
  Ais = [];

  for (let i = 0; i < lastState.activePlayers; i++){
    if (lastState.playersById[i].AiControlled){
      Ais[i] = createNewAi(lastState, i, refreshTime);
    }
  }
}

export function dispatchAiActions(){
  let state = store.getState();
  
  updateAiStates(state);
  
  for (let i = 0; i < Ais.length; i++){

    if (Ais[i] === undefined){
      continue;
    }

    let oldAi = Ais[i];
    let newAi = UpdateAiDirection(oldAi, state)
    
    if (newAi.currentDirection !== oldAi.currentDirection){
      store.dispatch(actions.changeDirection(newAi.playerId, newAi.currentDirection));
    }

    Ais[i] = newAi;
  }
}

function updateAiStates(state: GameState){

  // if map has changed, update territories
  if(state.fieldColors !== lastState.fieldColors){
    updateAiTerritories(state)
  }

  // if game has restarted, create new Ais
  if(state.currentTick < lastState.currentTick){
    Ais = [];
  }

  var players = state.playersById;
  
  // create or delete Ais due to players change
  for(let i = 0; i < players.length; i++) {
    if (players[i].AiControlled && Ais[i] === undefined && i < state.activePlayers){
      Ais[i] = createNewAi(state, i, refreshTime);
    }
    
    if (!(players[i].AiControlled) || i >= state.activePlayers) {
      delete Ais[i];
    }
  }

  // update other Ai properties
  for (let i = 0; i < Ais.length; i++){
    if (Ais[i] === undefined){
      continue;
    }
    Ais[i].precision = calculatePrecision(players[i].speed, refreshTime);
    Ais[i].PlayerHasDied = (players[i].deaths !== lastState.playersById[i].deaths);
  }

  lastState = state;
}

function updateAiTerritories(state: GameState){

  for (let i = 0; i < Ais.length; i++){
    if (Ais[i] === undefined){
      continue;
    }

    let color = state.playersById[i].color;
    let territoryBorder: Point[] = shuffle(getBorder(state.fieldColors, color, state.dimension));
    let territory: Point[] = shuffle(getTerritoryPoints(color, state.fieldColors));

    Ais[i] = {...Ais[i], territoryBorder, territory};
  }
}

function createNewAi(state: GameState, id: number, refreshTime: number): Ai{
  return {
    playerId: id,
    territoryBorder: getBorder(state.fieldColors, state.playersById[id].color, state.dimension),
    stepsDone: 0,
    currentTargets: [],
    territory: getTerritoryPoints(state.playersById[id].color, state.fieldColors),
    currentAction: 'inside',
    currentDirection: 'none',
    precision: calculatePrecision(state.playersById[id].speed, refreshTime),
    PlayerHasDied: false,
    playerHasntMoved: false
  };
}