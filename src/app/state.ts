import { mazesPatterns } from "../assets/data";
import { AppStateType } from "../types";

const AppInitialState: AppStateType = {
  grid: { row: 0, column: 0 },
  nodeMaxWidth: 25,
  modalState: mazesPatterns,
  speed: "fast",
  pathArr: [],
  visitedArr: [],
  maze: "",
  algorithm: "bfs",
  isPlay: false,
  isBoardClear: false,
  isSettingsOpen: false,
  isAsideModalOpen: false,
  isAnimationComplete: true,
  isFindAnimationNodes: true,
  isFullScreenModelOpen: true,
  isMazeAnimationComplete: true,
};

export default AppInitialState;
