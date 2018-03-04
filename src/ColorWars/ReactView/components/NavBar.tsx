import 'rc-slider/assets/index.css';
import '../../Settings.css';
import * as actions from '../../ReduxStore/actionTypes';

import * as React from 'react';
import {
  Button
} from 'react-bootstrap';

export interface Props {
  visible: boolean;
  onShow: (value: boolean) => actions.ShowSettings;
}

class NavBar extends React.Component<Props, object> {

  render() {
      return (
        <div className="NavBar">
          <Button bsStyle="primary" onClick={this.onShow}>
            {this.props.visible ? "Hide settings" : "Show settings"}
          </Button>
      </div>
      );
    }

  onShow = () => {
    this.props.onShow(!this.props.visible);
  }    
}

export default NavBar;