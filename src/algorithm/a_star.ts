import { AlgorithmFunType, VertexType, VisitedType } from "../types";
import { AStarNode } from "./algo_classes";
import { neighbour } from "./algo_utility_method";
import { PriorityQueue } from "./PriorityQueue";

const aStar: AlgorithmFunType = (
  totalRow,
  totalColumn,
  startVertex,
  targetVertex
) => {
  let visited: VisitedType<AStarNode> = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let openList = new PriorityQueue<AStarNode>(
    (a, b) => {
      return a.f - b.f;
    },
    [],
    new Set()
  );
  let closeList = new PriorityQueue<AStarNode>(
    (a, b) => {
      return a.f - b.f;
    },
    [],
    new Set()
  );
  let isTargetNodeFind = false;
  let start = new AStarNode(startVertex, null, 0, 0);
  start.g = 0;
  start.f = 0;
  openList.add(start);
  visited[`node-${start.self.x}-${start.self.y}`] = start;
  while (!openList.isEmpty()) {
    let current = openList.get();
    if (isTargetNodeFind) {
      break;
    }
    let vertexNeighbour = neighbour(
      current.self,
      totalRow,
      totalColumn,
      "a_star",
      [],
      visited,
      targetVertex
    ) as AStarNode[];
    vertexNeighbour.forEach((vertex) => {
      let { x, y } = vertex.self;
      if (!isTargetNodeFind) {
        if (x === targetVertex.x && y === targetVertex.y) {
          isTargetNodeFind = true;
          vertex.parent = current;
          visitedArr.push(vertex.self);
        } else if (!closeList.contains(vertex)) {
          let gNew = current.g + vertex.weight;
          let fNew = vertex.heuristic + gNew;
          if (vertex.f === Number.MAX_VALUE || vertex.f > fNew) {
            if (openList.contains(vertex)) {
              openList.remove(vertex);
            }
            vertex.f = fNew;
            vertex.g = gNew;
            vertex.parent = current;
            openList.add(vertex);
          }
        }
      }
      visited[`node-${x}-${y}`] = vertex;
    });
    closeList.add(current);
    visitedArr.push(current.self);
  }
  let { x, y } = targetVertex;
  let parent = visited[`node-${x}-${y}`];
  while (parent) {
    pathArr.push(parent.self);
    if (parent.parent === null) {
      break;
    }
    parent = parent.parent as AStarNode;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};

export default aStar;
