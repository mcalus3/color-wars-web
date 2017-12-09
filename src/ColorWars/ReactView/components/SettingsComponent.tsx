import PlayersSettings from '../../ReduxStore/containers/PlayersSettings';
import 'rc-slider/assets/index.css';
import '../../Settings.css';
import * as actions from '../../ReduxStore/actionTypes';

import * as React from 'react';
import {
  FormControl,
  Button,
  ButtonToolbar,
  ControlLabel,
  DropdownButton,
  MenuItem,
  Form,
  FormGroup
} from 'react-bootstrap';

import { Point } from '../../utils/objectTypes';
import { FRAMES_PER_SEC } from '../../utils/functions';


export interface Props {
  dimension: Point;
  startingTerritory: number;
  endTime: number;
  optimized: boolean;
  phase: string;
  onOptimization: (value: boolean) => actions.SetOptimization;
  onCreateGame: () => actions.CreateBoard;
  onPauseGame: () => actions.Pause;
  onResumeGame: () => actions.Resume;
  onResizeBoard: (size: Point) => actions.ResizeBoard;
  onChangeStartTerritory: (size: number) => actions.SetStartingTerritory;
  onChangeGameTime: (frames: number) => actions.SetGameTime;
  onTemplateChange: (no: number) => actions.ChangeMapTemplate;
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

  changeRows = (e: any) => {
    let val = clipMapDim(e.target.value);
    this.setState({ bWidth: val });
    this.props.onResizeBoard({
      X: val,
      Y: this.state.bHeight
    });
  }

  changeCols = (e: any) => {
    let val = clipMapDim(e.target.value);    
    this.setState({ bHeight: val });
    this.props.onResizeBoard({
      X: this.state.bWidth,
      Y: val
    });
  }

  onChangeGameTime = (e: any) => {
    this.props.onChangeGameTime(e.target.value * FRAMES_PER_SEC);
  }

  onChangeStartTerritory = (e: any) => {
    this.props.onChangeStartTerritory(e.target.value);
  }

  onTemplateChange = (e: any) => {
    return this.props.onTemplateChange(e);
  }

  onPauseResume = (e: any) => {
    if (this.props.phase === 'paused'){
      this.props.onResumeGame();
    } else {
      this.props.onPauseGame();
    }
  }

  render() {
    return (
      <span>
        <div className="Settings">
          <h1>Game Settings</h1>
          <ButtonToolbar>
            <DropdownButton title="Change map" id="bg-nested-dropdown" onSelect={this.onTemplateChange}>
              <MenuItem eventKey="0">Free for all</MenuItem>
              <MenuItem eventKey="1">Bots show-off</MenuItem>
              <MenuItem eventKey="2">War</MenuItem>
              <MenuItem eventKey="3">Pairs</MenuItem>
              <MenuItem eventKey="4">Fast duel</MenuItem>
              <MenuItem eventKey="5">Slow Duel</MenuItem>
              <MenuItem eventKey="6">2 vs 2</MenuItem>
              <MenuItem eventKey="7">2 vs 1</MenuItem>
            </DropdownButton>

            <Button
              bsStyle="primary"
              onClick={this.props.onCreateGame}
            >
              Restart game
            </Button>
          </ButtonToolbar>

          <div className="SettingsGroup">
            <ButtonToolbar>

              <Button onClick={this.onPauseResume}>
                {this.props.phase === 'paused' ? 'resume game' : 'pause game'}
              </Button>

              <Button active={this.props.optimized} onClick={this.onOptimizedChange}>
                toggle optimized rendering
              </Button>
            </ButtonToolbar>
          </div>
          <div className="SettingsGroup">
            <Form>
              <FormGroup>
                <ControlLabel>
                  game time(in seconds)
                </ControlLabel>
                  <FormControl
                    type={'number'}
                    placeholder={'game time(in seconds)'}
                    value={(this.props.endTime / FRAMES_PER_SEC).toString()}
                    onChange={this.onChangeGameTime}
                  />
              </FormGroup>
              <FormGroup>
              <ControlLabel>
              starting territory size
              </ControlLabel>
                <FormControl
                  type={'number'}
                  placeholder={'starting territory size'}
                  value={this.props.startingTerritory.toString()}
                  onChange={this.onChangeStartTerritory}
                />
              </FormGroup>
            </Form>
          </div>

          <h2>Board dimension</h2>
          
          <div className="SettingsGroup">
            <FormGroup>
              <ControlLabel>
              width
              </ControlLabel>
              <FormControl
                type={'number'}
                placeholder={'width'}
                min={this.minBoard}
                max={this.maxBoard}
                value={this.props.dimension.X}
                onChange={this.changeRows}
              />
            </FormGroup>
              <FormGroup>
              <ControlLabel>
              height
              </ControlLabel>
                  <FormControl
                    type={'number'}
                    placeholder={'height'}
                    min={this.minBoard}
                    max={this.maxBoard}
                    value={this.props.dimension.Y}
                    onChange={this.changeCols}
                  />
              </FormGroup>
          </div>
        </div>
        <PlayersSettings />
      </span>
    );
  }
}

export default SettingsComponent;

function clipMapDim(dim: number): number{
  return Math.round(Math.max(Math.min(dim, 200),1));
}