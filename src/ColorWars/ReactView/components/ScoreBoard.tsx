import Timer from '../../ReduxStore/containers/Timer';
import * as React from 'react';
import { Stage, FastLayer } from 'react-konva';

import { Point } from '../../utils/objectTypes';
import {
  colorNumToName,
  createHistogram,
  getDimensionForCanvas
} from '../../utils/functions';
import ScoreBar from './GameElements/ScoreBar';

export interface Props {
  fieldColors: number[][];
  dimension: Point;
  mobile: number;
}

class ScoreBoard extends React.Component<Props, object> {

  render() {
    let canvDim = getDimensionForCanvas(this.props.dimension, this.props.mobile !== 0);
    canvDim.X /= 3;
    const scoreBars = createScoreBars(this.props.fieldColors, canvDim);
    return (
      <div className="ScoreBoard">
        <Stage width={canvDim.X} height={canvDim.Y}>
          
          <FastLayer>
            {scoreBars}
          </FastLayer>
          
          <FastLayer>
            <Timer />
          </FastLayer>

        </Stage>
      </div>
    );
  }
}

export default ScoreBoard;

// helpers

function createScoreBars(fields: number[][], canvasDimension: Point) {
  var bars: JSX.Element[] = [];

  var colorsArr, valuesArr: number[];
  ({ colorsArr, valuesArr } = createHistogram(fields));
  colorsArr.forEach((value: number, index: number) => {
    bars.push(
      <ScoreBar
        color={colorNumToName[value]}
        rect={scoreBoardLayouter(valuesArr, index, canvasDimension)}
        key={colorNumToName[value]}
      />
    );
  });
  return bars;
}

function scoreBoardLayouter(
  values: number[],
  position: number,
  dim: Point
): { X: number; Y: number; Width: number; Height: number } {
  return {
    X: 0,
    Y: Math.floor(dim.Y / values.length * position),
    Width: Math.floor(values[position] * dim.X / values[0]),
    Height: Math.floor(dim.Y / values.length)
  };
}