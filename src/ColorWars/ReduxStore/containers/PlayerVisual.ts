import PlayerVisual from '../../ReactView/components/GameElements/PlayerVisual';
import { connect } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: GameState,
  ownProps: { id: number } = { id: 0 }
) {
  return {
    player: state.playersById[ownProps.id],
    dim: state.dimension,
    optimized: state.optimized,
    state: state.gamePhase
  };
}

export default connect(mapStateToProps)(PlayerVisual);
