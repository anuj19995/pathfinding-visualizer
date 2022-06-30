import { AlgorithmFunType, VertexType, VisitedType } from "../types";
import { DijkstraNode } from "./algo_classes";
import { neighbour } from "./algo_utility_method";
import { PriorityQueue } from "./PriorityQueue";

const dijkstra: AlgorithmFunType = (
  totalRow,
  totalColumn,
  startVertex,
  targetVertex
) => {
  let visited: VisitedType<DijkstraNode> = {};
  let visit: any = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let que = new PriorityQueue<DijkstraNode>(
    (a, b) => a.wsf - b.wsf,
    [],
    new Set()
  );
  let isTargetNodeFind = false;
  que.add(new DijkstraNode(startVertex, null, 0, 0));
  while (!que.isEmpty()) {
    let u = que.get();
    let { x, y } = u.self;
    if (isTargetNodeFind) {
      break;
    }
    if (visit[`node-${x}-${y}`]) {
      continue;
    }
    visit[`node-${x}-${y}`] = true;
    visitedArr.push(u.self);
    let vertexNeighbour = neighbour(
      u.self,
      totalRow,
      totalColumn,
      "dijkstra",
      [],
      visited
    ) as DijkstraNode[];
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (!isTargetNodeFind) {
        if (x === targetVertex.x && y === targetVertex.y) {
          isTargetNodeFind = true;
          v.parent = u;
          visited[`node-${x}-${y}`] = v;
          visitedArr.push(v.self);
        } else if (v.wsf === Number.MAX_VALUE || v.wsf > u.wsf + v.weight) {
          if (que.contains(v)) {
            que.remove(v);
          }
          v.wsf = u.wsf + v.weight;
          v.parent = u;
          que.add(v);
        }
      }
      visited[`node-${x}-${y}`] = v;
    });
  }
  let { x, y } = targetVertex;
  let parent = visited[`node-${x}-${y}`];
  while (parent) {
    pathArr.push(parent.self);
    if (parent.parent === null) {
      break;
    }
    parent = parent.parent as DijkstraNode;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};
export default dijkstra;
