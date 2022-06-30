import { AlgorithmFunType, VertexType, VisitedType } from "../types";
import { GBFSNode } from "./algo_classes";
import { neighbour } from "./algo_utility_method";
import { PriorityQueue } from "./PriorityQueue";

const gbfs: AlgorithmFunType = (
  totalRow,
  totalColumn,
  startVertex,
  targetVertex
) => {
  let visited: VisitedType<GBFSNode> = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let que = new PriorityQueue<GBFSNode>(
    (a, b) => {
      return a.heuristic + a.weight - b.heuristic - b.weight;
    },
    [],
    new Set()
  );
  let isTargetNodeFind = false;
  que.add(
    new GBFSNode(
      startVertex,
      null,
      0,
      Math.abs(startVertex.x - targetVertex.x) +
        Math.abs(startVertex.y - targetVertex.y)
    )
  );
  while (!que.isEmpty()) {
    let u = que.get();
    let { x, y } = u.self;
    if (isTargetNodeFind) {
      break;
    }
    if (visited[`node-${x}-${y}`]) {
      continue;
    }
    visited[`node-${x}-${y}`] = u;
    visitedArr.push(u.self);
    let vertexNeighbour = neighbour(
      u.self,
      totalRow,
      totalColumn,
      "gbfs",
      [],
      visited,
      targetVertex
    ) as GBFSNode[];
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (x === targetVertex.x && y === targetVertex.y) {
        isTargetNodeFind = true;
        v.parent = u;
        visited[`node-${x}-${y}`] = v;
        visitedArr.push(v.self);
      }
      if (!isTargetNodeFind) {
        if (!visited[`node-${x}-${y}`]) {
          v.parent = u;
          que.add(v);
        }
      }
    });
  }
  let { x, y } = targetVertex;
  let parent = visited[`node-${x}-${y}`];
  while (parent) {
    pathArr.push(parent.self);
    if (parent.parent === null) {
      break;
    }
    parent = parent.parent! as GBFSNode;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};
export default gbfs;
