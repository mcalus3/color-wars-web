import PlayerVisual from '../../ReactView/components/GameElements/PlayerVisual';
import { connect } from 'react-redux';

import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState, ownProps: {name: string, key: string} = {name: '', key: ''}) {
  return {
      player: state.playersByName[ownProps.name],
      dim: state.dimension,
      optimized: state.optimized
    }
}

export default connect(mapStateToProps)(PlayerVisual);