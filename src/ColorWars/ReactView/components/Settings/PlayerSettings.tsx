import 'rc-slider/assets/index.css';
import '../../../Settings.css';
import * as React from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import * as actions from '../../../ReduxStore/actionTypes';
import { swap } from '../../../utils/functions';

const SliderWithTooltip = createSliderWithTooltip(Slider);
SliderWithTooltip;

export interface Props {
  name: string,
  color: number,
  speed: number,
  deathPenalty: number,
  keys: {[key: number]: string},
onPlayerModify: (name: string, prop: string, value: any) => actions.modifyPlayer,
};

class PlayerSettingsControl extends React.Component<Props, object>{ 
  
  maxSpeed: number = 40;

  onNameChange = (e: any) =>{
    // TODO
  }

  onColorChange = (e: any) => {
    this.props.onPlayerModify(this.props.name, 'color', parseInt(e.target.value));
  }

  onSpeedChange = (v: any) =>{
    let speed = 40 / Math.floor(Math.pow(2, v));
    this.props.onPlayerModify(this.props.name, 'speed', speed);
  }

  onKeyChange = (e: any) =>{
    let mapping = {...this.props.keys};
    let dir = Object.keys(mapping).find(key => mapping[key] === e.placeholder) as string;
    delete mapping[dir];
    mapping[parseInt(e.target.value)] = e.target.placeholder;
    this.props.onPlayerModify(this.props.name, 'keyMapping', mapping);
  }

  onPenaltyChange = (v: any) =>{
    let penalty = 40 * Math.floor(Math.pow(2, v));
    this.props.onPlayerModify(this.props.name, 'deathPenalty', penalty);
  }

  render(){
    let dirKeys = swap(this.props.keys);
    Object.keys(dirKeys).forEach((k: string) => {
      dirKeys[k] = parseInt(dirKeys[k]);
    });
    return (
      <div className='playerSettings'>
        <Form horizontal>
          <FormGroup controlId="playerName">
            <Col componentClass={ControlLabel} sm={3}>
              Name
            </Col>
            <Col sm={9}>
              <FormControl type="string" placeholder="name"  value={this.props.name} onChange={this.onNameChange} disabled/>
            </Col>
          </FormGroup>

          <FormGroup controlId="playerColor">
            <Col componentClass={ControlLabel} sm={3}>
              color
            </Col>
            <Col sm={9}>
              <FormControl type="string" placeholder="color" value={this.props.color} onChange={this.onColorChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="playerSpeed">
            <Col componentClass={ControlLabel} sm={3}>
              speed
            </Col>
            <Col sm={9}>
              <SliderWithTooltip
                min={0}
                max={Math.log2(this.maxSpeed)}
                tipFormatter={this.myFormatter}
                defaultValue={Math.log2(this.props.speed)}
                onAfterChange={this.onSpeedChange}
                step={1/this.maxSpeed}
              />

            </Col>
          </FormGroup>

          <FormGroup controlId="playerPenalty">
            <Col componentClass={ControlLabel} sm={3}>
              death penalty
            </Col>
            <Col sm={9}>
              <SliderWithTooltip
                min={0}
                max={Math.log2(this.maxSpeed)}
                step={1/this.maxSpeed}
                tipFormatter={this.deathFormatter(this.maxSpeed)}
                defaultValue={Math.log2(this.props.deathPenalty/40)}
                onAfterChange={this.onPenaltyChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="keyMapping">
          <Col componentClass={ControlLabel} sm={2}>
              keys
            </Col>
            <Col sm={6} smOffset={1}>
              <FormControl type="number" placeholder="up" defaultValue={dirKeys['up']} onChange={this.onKeyChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="keyMapping">
            <Col sm={6}>
              <FormControl type="number" placeholder="left" defaultValue={dirKeys['left']} onChange={this.onKeyChange}/>
              </Col>
            <Col sm={6}>
              <FormControl type="number" placeholder="right" defaultValue={dirKeys['right']} onChange={this.onKeyChange}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="keyMapping">
          <Col sm={6} smOffset={3}>
          <FormControl type="number" placeholder="down" defaultValue={dirKeys['down']} onChange={this.onKeyChange}/>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  myFormatter(v: any) {
    return `${Math.floor(Math.pow(2, v))}`;
  }

  deathFormatter(max: number){
    return (v: any) =>{
      if(v === Math.log2(max)) return 'endless';
      return `${Math.floor(Math.pow(2, v))}`;
    }
  }
}

export default PlayerSettingsControl;