import TouchScreenButtons from '../../ReactView/components/TouchScreenButtons';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';
import { GameState } from '../../utils/objectTypes';

export function mapStateToProps(state: GameState) {
  return {
    enabled: state.touchscreenDetected
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onPlayerModify: (value: string) =>
    dispatch(actions.changeDirection(0, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchScreenButtons);
