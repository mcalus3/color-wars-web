import Fieldsx from "../../ReactView/components/Fields";
import { AppState } from "../../utils/objectTypes";
import { connect } from "react-redux";

export function mapStateToProps(state: AppState) {
  return {
    fields: state.gameState.fieldColors,
    lastUpdatedCoords: state.gameState.lastUpdatedCoords,
    dimension: state.gameState.dimension
  };
}

export default connect(mapStateToProps)(Fieldsx);
