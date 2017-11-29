import PlayersSettings from '../../ReduxStore/containers/PlayersSettings';
import 'rc-slider/assets/index.css';
import '../../Settings.css';
import * as actions from '../../ReduxStore/actionTypes';

import * as React from 'react';
import {
  FormControl,
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  ControlLabel
} from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import { Point } from '../../utils/objectTypes';
import DynamicTable from './Settings/DynamicTable';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export interface Props {
  dimension: Point;
  startingTerritory: number;
  endTime: number;
  optimized: boolean;
  onOptimization: (value: boolean) => actions.SetOptimization;
  onCreateGame: () => actions.CreateBoard;
  onPauseGame: () => actions.Pause;
  onResumeGame: () => actions.Resume;
  onResizeBoard: (size: Point) => actions.ResizeBoard;
  onChangeStartTerritory: (size: number) => actions.SetStartingTerritory;
  onChangeGameTime: (frames: number) => actions.SetGameTime;
}

class SettingsComponent extends React.Component<
  Props,
  { bHeight: number; bWidth: number }
> {
  maxBoard: number = 100;
  minBoard: number = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      bHeight: this.props.dimension.Y,
      bWidth: this.props.dimension.X
    };
  }

  onOptimizedChange = () => {
    this.props.onOptimization(!this.props.optimized);
  }

  changeRows = (v: number) => {
    this.setState({ bWidth: Math.floor(Math.pow(2, v)) });
    this.props.onResizeBoard({
      X: Math.floor(Math.pow(2, v)),
      Y: this.state.bHeight
    });
  }

  changeCols = (v: number) => {
    this.setState({
      bHeight: Math.floor(
        Math.pow(2, Math.log2(this.maxBoard) + Math.log2(this.minBoard) - v)
      )
    });
    this.props.onResizeBoard({
      X: this.state.bWidth,
      Y: Math.floor(
        Math.pow(2, Math.log2(this.maxBoard) + Math.log2(this.minBoard) - v)
      )
    });
  }

  onChangeGameTime = (e: any) => {
    this.props.onChangeGameTime(e.target.value * 40);
  }

  onChangeStartTerritory = (e: any) => {
    this.props.onChangeStartTerritory(e.target.value);
  }

  render() {
    return (
      <span>
        <div className="Settings">
          <h1>Game Settings</h1>
          <ButtonToolbar>
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={this.props.onCreateGame}
            >
              Restart game
            </Button>
            <Button bsSize="small" onClick={this.props.onPauseGame}>
              pause game
            </Button>
            <Button bsSize="small" onClick={this.props.onResumeGame}>
              resume game
            </Button>
          </ButtonToolbar>
          <div className="SettingsGroup">
            <ButtonToolbar className="Settings-element inline">
              <ToggleButtonGroup type="checkbox">
                <ToggleButton value={1} onChange={this.onOptimizedChange}>
                  toggle optimized rendering
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </div>
          <div className="SettingsGroup">
            <ControlLabel className="inline">
              game time(in seconds)
            </ControlLabel>
            <ControlLabel className="inline">
              starting territory size
            </ControlLabel>
          </div>
          <div className="SettingsGroup">
            <FormControl
              type={'number'}
              placeholder={'game time(in seconds)'}
              className="inline"
              defaultValue={(this.props.endTime / 40).toString()}
              onChange={this.onChangeGameTime}
            />
            <FormControl
              type={'number'}
              placeholder={'starting territory size'}
              className="inline"
              defaultValue={this.props.startingTerritory.toString()}
              onChange={this.onChangeStartTerritory}
            />
          </div>

          <h2>Board dimension</h2>
          <SliderWithTooltip
            min={Math.log2(this.minBoard)}
            max={Math.log2(this.maxBoard)}
            defaultValue={Math.log2(this.props.dimension.X)}
            onAfterChange={this.changeRows}
            tipFormatter={myFormatter}
            step={1 / (this.maxBoard - this.minBoard)}
            className="horizontalBar"
          />
          <div className="SettingsGroup">
            <SliderWithTooltip
              vertical={true}
              min={Math.log2(this.minBoard)}
              max={Math.log2(this.maxBoard)}
              defaultValue={
                Math.log2(this.maxBoard) +
                Math.log2(this.minBoard) -
                Math.log2(this.props.dimension.Y)
              }
              onAfterChange={this.changeCols}
              tipFormatter={invertedFormatter(
                Math.log2(this.maxBoard) + Math.log2(this.minBoard)
              )}
              step={1 / (this.maxBoard - this.minBoard)}
              className="verticalBar"
            />
            <DynamicTable rows={this.state.bWidth} cols={this.state.bHeight} />
          </div>
        </div>
        <PlayersSettings />
      </span>
    );
  }
}

export default SettingsComponent;

function myFormatter(v: number) {
  return `${Math.ceil(Math.pow(2, v))}`;
}

function invertedFormatter(max: number) {
  return (v: number) => {
    return `${Math.floor(Math.pow(2, max - v))}`;
  };
}
