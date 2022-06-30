import { AStarNode, DijkstraNode, GBFSNode } from "./algorithm/algo_classes";

export interface VisitedType<T> {
  [key: string]: T;
}
export type NeighbourType = (
  vertex: VertexType,
  row: number,
  column: number,
  which: string,
  vertices: (GBFSNode | VertexType | DijkstraNode | AStarNode)[],
  visited: VisitedType<GBFSNode | VertexType | DijkstraNode | AStarNode>,
  targetVertex?: VertexType
) => (GBFSNode | VertexType | DijkstraNode | AStarNode)[];
export type FindNeighbourType = (
  x: number,
  y: number,
  row: number,
  column: number,
  which: string,
  vertices: (GBFSNode | VertexType | DijkstraNode | AStarNode)[],
  visited: VisitedType<GBFSNode | VertexType | DijkstraNode | AStarNode>,
  targetVertex?: VertexType
) => void;

export type CompareToFun<T> = (a: T, b: T) => number;

export interface AlgorithmFunType {
  (
    noOfRow: number,
    noOfColumn: number,
    startVertex: VertexType,
    targetVertex: VertexType
  ): {
    visitedArr: VertexType[];
    pathArr: VertexType[];
  };
}
export interface VertexType {
  x: number;
  y: number;
}

export interface Index {
  r: number;
  c: number;
}
export interface Point {
  tRC: Index;
  tLC: Index;
  bRC: Index;
  bLC: Index;
}
export interface IndexDone {
  isTRC: boolean;
  isTLC: boolean;
  isBRC: boolean;
  isBLC: boolean;
}

export interface ModalType {
  children: any;
  handleChange: (e: any) => void;
  radioState: string;
}
export interface ModalStateType {
  heading: string;
  name: string;
  list: ModalListType[];
}
export interface ModalListType {
  title: string;
  value: string;
  id: number;
}
export interface GridType {
  row: number;
  column: number;
}
export interface AppStateType {
  grid: GridType;
  isFullScreenModelOpen: boolean;
  nodeMaxWidth: number;
  isPlay: boolean;
  isSettingsOpen: boolean;
  isBoardClear: boolean;
  modalState: ModalStateType;
  speed: string;
  algorithm: string;
  visitedArr: VertexType[];
  pathArr: VertexType[];
  maze: string;
  isMazeAnimationComplete: boolean;
  isFindAnimationNodes: boolean;
  isAnimationComplete: boolean;
  isAsideModalOpen: boolean;
}
export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_ASIDE_MODAL"; payload: boolean }
  | { type: "ADD_GRID"; payload: GridType }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "CHANGE_MODAL_STATE"; payload: ModalStateType }
  | { type: "CHANGE_PLAY"; payload: boolean }
  | { type: "CHANGE_SPEED"; payload: string }
  | { type: "CHANGE_ALGORITHM"; payload: string }
  | { type: "CHANGE_FIND_ANIMATION_NODES"; payload: boolean }
  | { type: "CHANGE_MAZE"; payload: string }
  | { type: "ANIMATION_COMPLETE"; payload: boolean }
  | { type: "MAZE_ANIMATION_COMPLETE"; payload: boolean }
  | { type: "CHANGE_NODE_MAX_WIDTH"; payload: number };

export type SpecialNodeType = {
  x: number;
  y: number;
  self: HTMLElement;
};
export type RunningAlgorithmType = (
  totalRow: number,
  totalColumn: number,
  whichAlgorithm: string,
  startVertex: SpecialNodeType,
  targetVertex: SpecialNodeType
) => {
  visitedArr: VertexType[];
  pathArr: VertexType[];
};
