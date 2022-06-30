import { ActionType, AppStateType } from "../types";

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  switch (action.type) {
    case "ADD_GRID": {
      return {
        ...state,
        grid: action.payload,
      };
    }

    case "CHANGE_PLAY": {
      return {
        ...state,
        isPlay: action.payload,
      };
    }
    case "MAZE_ANIMATION_COMPLETE": {
      return {
        ...state,
        isMazeAnimationComplete: action.payload,
      };
    }
    case "ANIMATION_COMPLETE": {
      return {
        ...state,
        isAnimationComplete: action.payload,
      };
    }
    case "CHANGE_NODE_MAX_WIDTH": {
      return {
        ...state,
        nodeMaxWidth: action.payload,
      };
    }
    case "CHANGE_MODAL_STATE": {
      return {
        ...state,
        modalState: action.payload,
      };
    }
    case "CHANGE_ASIDE_MODAL": {
      return {
        ...state,
        isAsideModalOpen: action.payload,
      };
    }
    case "CHANGE_FULLSCREEN_MODEL": {
      return {
        ...state,
        isFullScreenModelOpen: action.payload,
      };
    }
    case "CHANGE_MAZE": {
      return {
        ...state,
        maze: action.payload,
      };
    }
    case "CHANGE_FIND_ANIMATION_NODES": {
      return {
        ...state,
        isFindAnimationNodes: action.payload,
      };
    }
    case "CHANGE_ALGORITHM": {
      return {
        ...state,
        algorithm: action.payload,
      };
    }
    case "CHANGE_SPEED": {
      return {
        ...state,
        speed: action.payload,
      };
    }
    case "OPEN_SETTINGS": {
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    }
    case "CLEAR_BOARD": {
      return {
        ...state,
        isBoardClear: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
