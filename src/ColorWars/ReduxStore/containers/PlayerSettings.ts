import PlayerSettings from '../../ReactView/components/Settings/PlayerSettings';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';

import { AppState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: AppState,
  ownProps: { id: number; key: string } = { id: 0, key: '0' }
) {
  return {
    name: state.gameState.playersById[ownProps.id].name,
    color: state.gameState.playersById[ownProps.id].color,
    speed: state.gameState.playersById[ownProps.id].speed,
    deathPenalty: state.gameState.playersById[ownProps.id].deathPenalty,
    avatar: state.gameState.playersById[ownProps.id].avatar,
    aiControlled: state.gameState.playersById[ownProps.id].aiControlled,
    aiDifficulty: state.gameState.playersById[ownProps.id].aiDifficulty,
    keys: state.gameState.keyMappingsById[ownProps.id]
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (id: number, prop: string, value: {}) =>
      dispatch(actions.modifyPlayer(id, prop, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSettings);
