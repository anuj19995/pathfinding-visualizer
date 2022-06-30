import { FindNeighbourType, NeighbourType } from "../types";
import { AStarNode, DijkstraNode, GBFSNode } from "./algo_classes";

export const findNeighbour: FindNeighbourType = (
  x,
  y,
  row,
  column,
  which,
  vertices,
  visited,
  targetVertex
) => {
  if (x >= 0 && x < row && y >= 0 && y < column) {
    let elm = document.getElementById(`node-${x}-${y}`)!,
      isBlack =
        elm.classList.contains("black-node-1") ||
        elm.classList.contains("black-node");
    if (!isBlack) {
      if (which === "bfs" || which === "dfs") {
        if (!visited[`node-${x}-${y}`]) {
          vertices.push({ x, y });
        }
      } else {
        if (visited[`node-${x}-${y}`]) {
          vertices.push(visited[`node-${x}-${y}`]);
        } else {
          let dataWeight = elm.getAttribute("data-weight");
          let weight = 1;
          if (dataWeight) {
            weight = parseInt(dataWeight);
          }
          if (targetVertex) {
            let h = Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y);
            if (which === "gbfs") {
              vertices.push(new GBFSNode({ x, y }, null, weight, h));
            } else {
              vertices.push(new AStarNode({ x, y }, null, weight, h));
            }
          } else {
            vertices.push(
              new DijkstraNode({ x, y }, null, weight, Number.MAX_VALUE)
            );
          }
        }
      }
    }
  }
};
export const neighbour: NeighbourType = (
  vertex,
  row,
  column,
  which,
  vertices,
  visited,
  targetVertex
) => {
  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  y = vertex.y - 1;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, row, column, which, vertices, visited, targetVertex);
  return vertices;
};
