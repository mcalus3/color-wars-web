import { Layer } from 'react-konva';
import { Rect, Node } from 'konva';
import * as React from 'react';

import { Point, TailByName, PlayerByName } from '../../utils/objectTypes';
import { colorNumToName, layouter } from '../../utils/functions';

export interface Props {
  tails: TailByName,
  players: PlayerByName
  playerNames: string[],
  activePlayers: number,
  dimension: Point,
}

class Tails extends React.Component<Props, object>{
  
  redraw: boolean;
  tails: TailByName;
  dimension: Point;
  canvasDimension: Point = {X: 0, Y: 0};
  layer: any;
  tailPrototypes: {[name: string]:Rect} = {};
  
 constructor(props: Props) {
    super(props)
    this.dimension = props.dimension;
    this.tails = this.props.tails;
  }
    
  componentDidMount() {
    this.layer = this.refs.tails as any;
    this.createPrototypes(this.props.dimension);
  }

  componentWillUpdate(nextProps: Props) {
    if(nextProps.dimension !== this.dimension){
      this.createPrototypes(nextProps.dimension);
    }
    this.props.playerNames.slice().forEach((name: string) => {
      
      var oldTail = this.tails[name];
      var newTail = this.props.tails[name];
    if (newTail.length > oldTail.length){
        newTail.slice(oldTail.length, newTail.length).forEach((p: Point) =>{
          
          let X, Y, Width, Height;
          ({X, Y, Width, Height} = layouter(nextProps.dimension, this.canvasDimension, p));
          
          let clone = this.tailPrototypes[name].clone({
            x: X,
            y: Y
          });
          this.layer.add(clone);
          this.tails[name].push({...p});
          clone.draw();
        });
      } else if (newTail.length === 0){
        this.layer.getChildren().forEach((node: Node) => {
          if(node.name() === name){
            node.destroy();
            this.redraw = true;
          }
        });
        this.tails[name] = [];
    }
    if(this.redraw){
      this.layer.draw();
      this.redraw = false;      
    }
    });
  }

  render(){
    return (
      <Layer ref='tails'>
      </Layer>
    );
  }

  createPrototypes(dim: Point){
    let canvas = this.layer.canvas._canvas as HTMLCanvasElement;
    this.canvasDimension= {X:canvas.width,Y:canvas.height};

    let X, Y, Width, Height;
    ({X, Y, Width, Height} = layouter(dim, this.canvasDimension, {X: 0, Y: 0}));
    for(let i = 0; i< this.props.playerNames.length; i++){
      let name = this.props.playerNames[i];
      let color = colorNumToName[this.props.players[name].color];
      this.tailPrototypes[name] = new Rect({
        width: Width,
        height: Height,
        shadowBlur: 3,
        opacity: 0.25,
        fill: color,
        name: name
      });
      this.tailPrototypes[name].cache();
    }
  }
}

export default Tails;