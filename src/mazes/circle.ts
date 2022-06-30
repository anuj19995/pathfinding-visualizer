import { IndexDone, Point, VertexType } from "../types";

let findVertex = (
  row: number,
  column: number,
  currIndex: { i: number; j: number },
  point: Point,
  indexDone: IndexDone,
  vertices: VertexType[]
) => {
  if (
    currIndex.i >= 0 &&
    currIndex.j >= 0 &&
    currIndex.i < row &&
    currIndex.j < column
  ) {
    vertices.push({ x: currIndex.i, y: currIndex.j });
    if (currIndex.j < point.tRC.c && !indexDone.isTRC) {
      currIndex.j++;
      if (currIndex.j === point.tRC.c) {
        indexDone.isTRC = true;
      }
    } else if (currIndex.i < point.bRC.r && !indexDone.isBRC) {
      currIndex.i++;
      if (currIndex.i === point.bRC.r) {
        indexDone.isBRC = true;
      }
    } else if (currIndex.j > point.bLC.c && !indexDone.isBLC) {
      currIndex.j--;
      if (currIndex.j === point.bLC.c) {
        indexDone.isBLC = true;
      }
    } else if (currIndex.i > point.tLC.r && !indexDone.isTLC) {
      currIndex.i--;
      if (currIndex.i === point.tLC.r) {
        indexDone.isTLC = true;
      }
    } else {
      indexDone.isTLC = false;
      indexDone.isTRC = false;
      indexDone.isBLC = false;
      indexDone.isBRC = false;
      currIndex.i--;
      if (
        currIndex.i >= 0 &&
        currIndex.j >= 0 &&
        currIndex.i < row &&
        currIndex.j < column
      ) {
        vertices.push({ x: currIndex.i, y: currIndex.j });
      }
      currIndex.i--;
      point.tRC = {
        r: point.tRC.r - 2,
        c: point.tRC.c + 2,
      };
      point.tLC = {
        r: point.tLC.r - 2,
        c: point.tLC.c - 2,
      };
      point.bRC = {
        r: point.bRC.r + 2,
        c: point.bRC.c + 2,
      };
      point.bLC = {
        r: point.bLC.r + 2,
        c: point.bLC.c - 2,
      };
    }
  }
};

const circle = (
  row: number,
  column: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let vertices: VertexType[] = [];
  let { x, y } = targetVertex;
  x = x - 1;
  let targetPoints = {
    tRC: {
      r: x,
      c: y + 1,
    },
    tLC: {
      r: x,
      c: y - 1,
    },
    bRC: {
      r: x + 2,
      c: y + 1,
    },
    bLC: {
      r: x + 2,
      c: y - 1,
    },
  };
  let targetDone = {
    isTRC: false,
    isTLC: false,
    isBRC: false,
    isBLC: false,
  };
  let target = {
    i: x,
    j: y,
  };
  y = startVertex.y;
  x = startVertex.x - 1;
  let startPoints = {
    tRC: {
      r: x,
      c: y + 1,
    },
    tLC: {
      r: x,
      c: y - 1,
    },
    bRC: {
      r: x + 2,
      c: y + 1,
    },
    bLC: {
      r: x + 2,
      c: y - 1,
    },
  };
  let startDone = {
    isTRC: false,
    isTLC: false,
    isBRC: false,
    isBLC: false,
  };
  let start = {
    i: x,
    j: y,
  };
  while (
    (target.i >= 0 && target.j >= 0 && target.i < row && target.j < column) ||
    (start.i >= 0 && start.j >= 0 && start.i < row && start.j < column)
  ) {
    findVertex(row, column, start, startPoints, startDone, vertices);
    findVertex(row, column, target, targetPoints, targetDone, vertices);
  }
  x = Math.floor((startVertex.x + targetVertex.x) / 2);
  y = Math.floor((startVertex.y + targetVertex.y) / 2);
  vertices.push({ x, y });
  y = y - 1;
  vertices.push({ x, y });
  y = y + 2;
  vertices.push({ x, y });
  return vertices;
};
export default circle;
