import { VertexType } from "../types";

class Node {
  constructor(
    public self: VertexType,
    public parent: AStarNode | GBFSNode | DijkstraNode | null,
    public weight: number
  ) {}
}

export class AStarNode extends Node {
  f: number;
  g: number;
  constructor(
    self: VertexType,
    parent: AStarNode | null,
    weight: number,
    public heuristic: number
  ) {
    super(self, parent, weight);
    this.f = Number.MAX_VALUE;
    this.g = Number.MAX_VALUE;
  }
}
export class DijkstraNode extends Node {
  constructor(
    self: VertexType,
    parent: DijkstraNode | null,
    weight: number,
    public wsf: number
  ) {
    super(self, parent, weight);
  }
}
export class GBFSNode extends Node {
  constructor(
    self: VertexType,
    parent: GBFSNode | null,
    weight: number,
    public heuristic: number
  ) {
    super(self, parent, weight);
  }
}
