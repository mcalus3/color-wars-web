import { FastLayer } from 'react-konva';
import { Rect, Node, Stage } from 'konva';
import * as React from 'react';

import { Point, Player } from '../../utils/objectTypes';
import { colorNumToName, layouter } from '../../utils/functions';

export interface Props {
  tails: Point[][];
  players: Player[];
  dimension: Point;
}

class Tails extends React.Component<Props, object> {
  
  canvasDimension: Point = { X: 0, Y: 0 };
  layer: any;
  tailPrototypes: Rect[] = [];

  shouldComponentUpdate(nextProps: Props){
    this.createPrototypesIfNecessary(nextProps);
    
    if(nextProps.tails === this.props.tails){
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.createPrototypes(this.props);
  }

  componentWillUpdate(nextProps: Props) {

    let tailsToDestroy: number[] = this.calculateTailsToDestroy(nextProps.tails);
    let nodesToDraw: Point[][] = this.calculateNodesToDraw(nextProps.tails);

      tailsToDestroy.forEach(num => {
        let tail = this.layer.getChildren((node: Node) => parseInt(node.name()) === num);
        tail.forEach((node: Node) => {
            node.destroy();
        });
      });

    for (let i = 0; i < nodesToDraw.length; i++) {
      if (nodesToDraw[i] === undefined){
        continue;
      }

      for (let j = 0; j < nodesToDraw[i].length; j++) {
        let p = nodesToDraw[i][j];
        let X, Y, Width, Height;
        ({ X, Y, Width, Height } = layouter(
          nextProps.dimension,
          this.canvasDimension,
          p
        ));

        let clone = this.tailPrototypes[i].clone({
          x: X,
          y: Y
        });
        this.layer.add(clone);
      }
    }
  
    this.layer.draw();

  }

  render() {
    return <FastLayer ref={(c) => { this.layer = c; }} />;
  }

  createPrototypesIfNecessary(nextProps: Props){
    if (nextProps.dimension !== this.props.dimension || this.colorsHasChanged(nextProps.players)){      
      this.createPrototypes(nextProps);
    }
  }

  colorsHasChanged(players: Player[]): boolean{
    for (let i = 0; i < players.length; i++){
      if (players[i].color !== this.props.players[i].color){
        return true;
      }
    }
    return false;
  }

  createPrototypes(nextProps: Props) {    
    let stage = this.layer.getStage() as Stage;
    this.canvasDimension = { X: stage.width(), Y: stage.height() };
    
    let X, Y, Width, Height;
    ({ X, Y, Width, Height } = layouter(nextProps.dimension, this.canvasDimension, {
      X: 0,
      Y: 0
    }));
    for (let i = 0; i < nextProps.players.length; i++) {

      if (this.tailPrototypes[i] !== undefined){
        this.tailPrototypes[i].clearCache();        
      }

      let color = colorNumToName[nextProps.players[i].color];
      this.tailPrototypes[i] = new Rect({
        width: Width,
        height: Height,
        shadowBlur: 3,
        opacity: 0.25,
        fill: color,
        name: i.toString()
      });
      this.tailPrototypes[i].cache();
    }
  }

  calculateTailsToDestroy(tails: Point[][]){
    let ret = [];
    for (let i = 0; i < this.props.tails.length; i++){
      if (this.props.tails[i].length > tails[i].length){
        ret.push(i);
      }
    }
    return ret;
  }

  calculateNodesToDraw(tails: Point[][]){
    let ret = [];
    for (let i = 0; i < tails.length; i++){
      if (this.props.tails[i].length < tails[i].length){
        ret[i] = tails[i].slice(this.props.tails[i].length);
      }      
    }
    return ret;      
  }
}

export default Tails;
