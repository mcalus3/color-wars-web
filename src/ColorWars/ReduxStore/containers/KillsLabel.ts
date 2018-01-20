import KillsLabel from '../../ReactView/components/GameElements/KillsLabel';
import { connect } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: GameState,
  ownProps: { id: number } = { id: 0 }
) {
  return {
    player: state.playersById[ownProps.id],
    dim: state.dimension,
    mapping: state.keyMappingsById[ownProps.id]
  };
}

export default connect(mapStateToProps)(KillsLabel);
