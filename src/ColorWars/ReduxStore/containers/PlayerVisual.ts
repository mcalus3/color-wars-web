import PlayerVisual from "../../ReactView/components/GameElements/PlayerVisual";
import { connect } from "react-redux";

import { AppState } from "../../utils/objectTypes";

export function mapStateToProps(
  state: AppState,
  ownProps: { id: number; key: string }
) {
  return {
    player: state.gameState.playersById[ownProps.id],
    dim: state.gameState.dimension,
    optimized: state.gameState.optimized,
    state: state.gameState.gamePhase
  };
}

export default connect(mapStateToProps)(PlayerVisual);
