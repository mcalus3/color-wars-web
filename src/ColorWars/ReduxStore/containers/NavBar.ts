import NavBar from '../../ReactView/components/NavBar';
import * as actions from '../actionTypes';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../utils/objectTypes';

export function mapStateToProps(state: AppState) {
  return {
    visible: state.settingsVisible
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
  return {
    onShow: (value: boolean) => dispatch(actions.ShowSettings(value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
