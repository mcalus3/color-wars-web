import Players from '../../ReactView/components/Players';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    activePlayers: state.activePlayers
  };
}

export default connect(mapStateToProps)(Players);
