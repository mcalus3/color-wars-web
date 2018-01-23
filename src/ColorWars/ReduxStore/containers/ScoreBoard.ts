import ScoreBoard from '../../ReactView/components/ScoreBoard';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    fieldColors: state.gameState.fieldColors,
    dimension: state.gameState.dimension,
    mobile: state.gameState.touchscreenMode
  };
}

export default connect(mapStateToProps)(ScoreBoard);
