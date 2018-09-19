import { FRAMES_PER_SEC } from '../../utils/functions';
import Timer from '../../ReactView/components/GameElements/Timer';
import { AppState } from '../../utils/objectTypes';
import { connect } from 'react-redux';

export function mapStateToProps(state: AppState) {
  return {
    secondsLeft: Math.floor(
      (state.gameState.endTime - state.gameState.currentTick) / FRAMES_PER_SEC
    )
  };
}

export default connect(mapStateToProps)(Timer);
