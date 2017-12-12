import PlayerVisual from '../../ReactView/components/GameElements/PlayerVisual';
import { connect } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(
  state: GameState,
  ownProps: { id: number; key: string } = { id: 0, key: '' }
) {
  return {
    player: state.playersById[ownProps.id],
    dim: state.dimension,
    optimized: state.optimized
  };
}

export default connect(mapStateToProps)(PlayerVisual);
