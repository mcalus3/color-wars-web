import KillsLabel from '../../ReactView/components/GameElements/KillsLabel';
import { connect } from 'react-redux';

import { AppState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: AppState,
  ownProps: { id: number } = { id: 0 }
) {
  return {
    player: state.gameState.playersById[ownProps.id],
    dim: state.gameState.dimension,
    mapping: state.gameState.keyMappingsById[ownProps.id]
  };
}

export default connect(mapStateToProps)(KillsLabel);
