import ScoreBoard from '../../ReactView/components/ScoreBoard';
import { GameState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: GameState) {
  return {
    fieldColors: state.fieldColors,
    dimension: state.dimension,
    mobile: state.touchscreenDetected
  };
}

export default connect(mapStateToProps)(ScoreBoard);
