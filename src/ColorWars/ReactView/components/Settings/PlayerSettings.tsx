import 'rc-slider/assets/index.css';
import '../../../Settings.css';
import * as React from 'react';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import * as actions from '../../../ReduxStore/actionTypes';
import { FRAMES_PER_SEC, swap } from '../../../utils/functions';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export interface Props {
  id: number;
  name: string;
  color: number;
  speed: number;
  deathPenalty: number;
  aiControlled: boolean;
  aiDifficulty: number;
  avatar: number;
  keys: { [key: string]: string };
  onPlayerModify: (
    id: number,
    prop: string,
    value: any
  ) => actions.ModifyPlayer;
}

class PlayerSettingsControl extends React.Component<Props, object> {
  maxSpeed: number = FRAMES_PER_SEC * 4; // fields/sec
  maxDeath: number = 10; // seconds of death

  render() {
    return (
      <div className="playerSettings">
        {this.renderGeneralSection()}
        {this.renderKeysSection()}
        {this.renderAiSection()}
      </div>
    );
  }

  renderGeneralSection() {
    return (
      <Form horizontal={true}>
        <FormGroup controlId="playerName">
          <Col componentClass={ControlLabel} sm={3}>
            Name
          </Col>
          <Col sm={9}>
            <FormControl
              type="string"
              placeholder="name"
              value={this.props.name}
              onChange={this.onNameChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="playerColor">
          <Col componentClass={ControlLabel} sm={3}>
            color
          </Col>
          <Col sm={9}>
            <FormControl
              type="string"
              placeholder="color"
              value={this.props.color}
              onChange={this.onColorChange}
            />
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
              value={Math.log2(FRAMES_PER_SEC / this.props.speed)}
              step={1 / this.maxSpeed}
              tipFormatter={this.speedFormatter}
              onChange={this.onSpeedChange}
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
              max={this.maxDeath}
              tipFormatter={this.deathFormatter(this.maxDeath)}
              value={this.props.deathPenalty / FRAMES_PER_SEC}
              onChange={this.onPenaltyChange}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }

  renderKeysSection() {
    if (Object.keys(this.props.keys).length === 0) {
      return;
    }
    let dirKeys = swap(this.props.keys);

    return (
      <Form horizontal={true}>
        <FormGroup controlId="keyMappingUp">
          <Col componentClass={ControlLabel} sm={2}>
            keys
          </Col>
          <Col sm={6} smOffset={1}>
            <FormControl
              placeholder="up"
              value={dirKeys.up}
              onChange={this.onKeyChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="keyMappingSides">
          <Col sm={6}>
            <FormControl
              placeholder="left"
              value={dirKeys.left}
              onChange={this.onKeyChange}
            />
          </Col>
          <Col sm={6}>
            <FormControl
              placeholder="right"
              value={dirKeys.right}
              onChange={this.onKeyChange}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="keyMappingDown">
          <Col sm={6} smOffset={3}>
            <FormControl
              placeholder="down"
              value={dirKeys.down}
              onChange={this.onKeyChange}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }

  renderAiSection() {
    return (
      <div>
        <div className="SettingsGroup">
          <Button
            active={this.props.aiControlled}
            onClick={this.onAiControlledChange}
          >
            aiControlled
          </Button>
        </div>
        {this.renderAiDifficulty()}
        {this.renderAvatarSlider()}
      </div>
    );
  }

  renderAiDifficulty() {
    if (this.props.aiControlled) {
      return (
        <FormGroup controlId="aiDiff">
          <Col componentClass={ControlLabel} sm={3}>
            Ai difficulty
          </Col>
          <Col sm={9}>
            <SliderWithTooltip
              min={0}
              max={1}
              step={1}
              tipFormatter={this.normalFormatter}
              value={this.props.aiDifficulty}
              onChange={this.onAiDifficultyChange}
            />
          </Col>
        </FormGroup>
      );
    }
    return null;
  }

  renderAvatarSlider() {
    if (!this.props.aiControlled) {
      return (
        <FormGroup controlId="avatarSlider">
          <Col componentClass={ControlLabel} sm={4}>
            avatar
          </Col>
          <Col sm={8}>
            <SliderWithTooltip
              min={1}
              max={5}
              step={1}
              tipFormatter={this.normalFormatter}
              value={this.props.avatar === 0 ? 1 : this.props.avatar}
              onChange={this.onAvatarChange}
            />
          </Col>
        </FormGroup>
      );
    }
    return null;
  }

  normalFormatter(v: number) {
    return `${v}`;
  }

  speedFormatter(v: number) {
    return `${Math.round(Math.pow(2, v))}`;
  }

  deathFormatter(max: number) {
    return (v: number) => {
      let calculated = Math.round(v);
      if (calculated === max) {
        return 'permament';
      }
      return `${calculated}`;
    };
  }

  onNameChange = (e: any) => {
    this.props.onPlayerModify(this.props.id, 'name', e.target.value);
  };

  onColorChange = (e: any) => {
    this.props.onPlayerModify(
      this.props.id,
      'color',
      parseInt(e.target.value, 10)
    );
  };

  onSpeedChange = (v: number) => {
    let MaxFraction = this.maxSpeed / FRAMES_PER_SEC;

    let visualSpeed = Math.round(Math.pow(2, v));
    let invSpeed =
      Math.round((FRAMES_PER_SEC / visualSpeed) * MaxFraction) / MaxFraction;
    this.props.onPlayerModify(this.props.id, 'speed', invSpeed);
  };

  onKeyChange = (e: any) => {
    let mapping = { ...this.props.keys };
    let dir = Object.keys(mapping).find(
      key => mapping[key] === e.target.placeholder
    ) as string;
    delete mapping[dir];
    mapping[e.target.value] = e.target.placeholder;
    this.props.onPlayerModify(this.props.id, 'keyMapping', mapping);
  };

  onPenaltyChange = (v: any) => {
    let penalty;

    if (v === this.maxDeath) {
      penalty = Infinity;
    } else {
      penalty = FRAMES_PER_SEC * v;
    }
    this.props.onPlayerModify(this.props.id, 'deathPenalty', penalty);
  };

  onAiControlledChange = () => {
    this.props.onPlayerModify(
      this.props.id,
      'aiControlled',
      !this.props.aiControlled
    );
  };

  onAiDifficultyChange = (v: any) => {
    this.props.onPlayerModify(this.props.id, 'aiDifficulty', v);
  };

  onAvatarChange = (v: number) => {
    this.props.onPlayerModify(this.props.id, 'avatar', v);
  };
}

export default PlayerSettingsControl;
