import { AlgorithmFunType, VertexType, VisitedType } from "../types";
import { neighbour } from "./algo_utility_method";

let column = 0,
  row = 0,
  visited: VisitedType<VertexType> = {},
  visitedArr: VertexType[],
  isTargetVertexFind = false,
  endVertex: VertexType;

const dfsMain = (vertex: VertexType) => {
  if (isTargetVertexFind) {
    return;
  }
  let unVisitedVertices = neighbour(
    vertex,
    row,
    column,
    "dfs",
    [],
    visited
  ) as VertexType[];
  unVisitedVertices.forEach((nxtVertex) => {
    let { x, y } = nxtVertex;
    if (x === endVertex.x && y === endVertex.y) {
      isTargetVertexFind = true;
      visitedArr.push({ x, y });
      visited[`node-${x}-${y}`] = vertex;
    }
    if (!isTargetVertexFind) {
      if (!visited[`node-${x}-${y}`]) {
        visited[`node-${x}-${y}`] = vertex;
        visitedArr.push(nxtVertex);
        dfsMain(nxtVertex);
      }
    }
  });
};

const dfs: AlgorithmFunType = (
  totalRow,
  totalColumn,
  startVertex,
  targetVertex
) => {
  column = totalColumn;
  row = totalRow;
  visited = {};
  visitedArr = [];
  visitedArr.push(startVertex);
  visited[`node-${startVertex.x}-${startVertex.y}`] = startVertex;
  isTargetVertexFind = false;
  endVertex = targetVertex;
  dfsMain(startVertex);
  let pathArr: VertexType[] = [];
  let { x, y } = endVertex;
  pathArr.push({ x, y });
  while (visited[`node-${x}-${y}`] !== startVertex) {
    let parentVertex = visited[`node-${x}-${y}`];
    if (!parentVertex) {
      break;
    }
    pathArr.push(parentVertex);
    x = parentVertex.x;
    y = parentVertex.y;
  }
  pathArr.push({ x: startVertex.x, y: startVertex.y });
  pathArr = pathArr.reverse();
  return { visitedArr, pathArr };
};
export default dfs;
