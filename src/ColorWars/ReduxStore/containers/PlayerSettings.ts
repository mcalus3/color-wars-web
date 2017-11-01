import PlayerSettings from '../../ReactView/components/Settings/PlayerSettings';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState, ownProps: {name: string, key: string} = {name: 'Marek', key: 'Marek'}) {
  return {
      name: ownProps.name,
      color: state.playersByName[ownProps.name].color,
      speed: state.playersByName[ownProps.name].speed,
      deathPenalty: state.playersByName[ownProps.name].deathPenalty,
      keys: state.playersByName[ownProps.name].keyMapping
    }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.action>) {
    return {
      onPlayerModify: (name: string, prop: string, value: any) => dispatch(actions.modifyPlayer(name, prop, value)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);