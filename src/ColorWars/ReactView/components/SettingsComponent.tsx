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
  visible: boolean;
  dimension: Point;
  startingTerritory: number;
  endTime: number;
  optimized: boolean;
  phase: string;
  touch: number;
  onShow: (value: boolean) => actions.ShowSettings;
  onOptimization: (value: boolean) => actions.SetOptimization;
  onCreateGame: () => actions.CreateBoard;
  onPauseGame: () => actions.Pause;
  onResumeGame: () => actions.Resume;
  onResizeBoard: (size: Point) => actions.ResizeBoard;
  onChangeStartTerritory: (size: number) => actions.SetStartingTerritory;
  onChangeGameTime: (frames: number) => actions.SetGameTime;
  onTemplateChange: (no: number) => actions.ChangeMapTemplate;
  onTouchChange: (val: number) => actions.SetTouch;
}

class SettingsComponent extends React.Component<Props, object> {

  maxBoard: number = 100;
  minBoard: number = 3;

  render() {
    if (!this.props.visible){
      return (
        <div className="HiddenSettings" >
          <Button
            bsStyle="primary"
            onClick={this.onShow}
          >
            <span className="glyphicon glyphicon-menu-hamburger" />
          </Button>
        </div>
      );

    } else {
      return (
        <div className="Settings">
          <div className="SettingsPanel">
            <h1>Game Settings</h1>
            <ButtonToolbar>
              <DropdownButton title="Change map" id="map-dropdown" onSelect={this.onTemplateChange}>
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
  
                {this.renderTouchscreenSettings()}
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

          <Button bsStyle="primary" onClick={this.onShow}>
            <span className="glyphicon glyphicon-menu-hamburger" />
          </Button>
        </div>        
      );
    }

  }

  renderTouchscreenSettings() {
    if (this.props.touch !== 0) {
      return <DropdownButton title={'Touchscreen mode'} id={"touch-dropdown"} onSelect={this.onTouch}>
      <MenuItem eventKey={1}>Relative directions</MenuItem>
      <MenuItem eventKey={2}>absolute directions</MenuItem>
      <MenuItem eventKey={3}>following touch</MenuItem>
    </DropdownButton>;
    }
    return null;
  }

  onShow = () => {
    this.props.onShow(!this.props.visible);
  }

  onOptimizedChange = () => {
    this.props.onOptimization(!this.props.optimized);
  }

  changeRows = (e: any) => {
    let val = clipMapDim(e.target.value);
    this.props.onResizeBoard({
      X: val,
      Y: this.props.dimension.Y
    });
  }

  changeCols = (e: any) => {
    let val = clipMapDim(e.target.value);    
    this.props.onResizeBoard({
      X: this.props.dimension.X,
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

  onTouch = (e: any) => {
    return this.props.onTouchChange(e);
  }

  onPauseResume = (e: any) => {
    if (this.props.phase === 'paused'){
      this.props.onResumeGame();
    } else {
      this.props.onPauseGame();
    }
  }
}

export default SettingsComponent;

function clipMapDim(dim: number): number{
  return Math.round(Math.max(Math.min(dim, 200),1));
}