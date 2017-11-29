import PlayerSettings from '../../ReactView/components/Settings/PlayerSettings';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: GameState,
  ownProps: { id: number; key: string } = { id: 0, key: '0' }
) {
  return {
    name: state.playersById[ownProps.id].name,
    color: state.playersById[ownProps.id].color,
    speed: state.playersById[ownProps.id].speed,
    deathPenalty: state.playersById[ownProps.id].deathPenalty,
    keys: state.keyMappingsById[ownProps.id]
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (id: number, prop: string, value: {}) =>
      dispatch(actions.modifyPlayer(id, prop, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
