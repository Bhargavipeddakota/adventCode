import { minOf } from "jsr:@std/collections";

const mapPositions = (pos, dir) => {
  const moves = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
  };
  const offset = moves[dir];
  return { x: pos.x + offset.x, y: pos.y + offset.y };
};

const traceWire = (instructions) => {
  let pos = { x: 0, y: 0 };
  const points = [];
  for (const ins of instructions) {
    for (let i = 0; i < ins.p; i++) {
      pos = mapPositions(pos, ins.d);
      points.push({ ...pos });
    }
  }
  return points;
};

const getIntersectPoints = (array1, array2) => {
  return array1
    .map((a) => {
      const match = array2.find((b) => a.x === b.x && a.y === b.y);
      return match ? [a] : [];
    })
    .flat();
};

const main = () => {
  const input = Deno.readTextFileSync("input1.txt");
//   const input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83`;
  const parts = input.split("\n");
  const instructions = parts.map((line) =>
    line.split(",").map((x) => ({
      d: x[0],
      p: parseInt(x.slice(1)),
    }))
  );

  const wire1 = traceWire(instructions[0]);
  const wire2 = traceWire(instructions[1]);
  const intersections = getIntersectPoints(wire1, wire2);
  const nearest = minOf(
    intersections.map((p) => Math.abs(p.x) + Math.abs(p.y)),
    (x) => x,
  );
    const combinedSteps = intersections.map((p) => {
    const key = (pt) => pt.x === p.x && pt.y === p.y;
    const steps1 = wire1.findIndex(key) + 1;
    const steps2 = wire2.findIndex(key) + 1;
    return steps1 + steps2;
  });
    const minSteps = minOf(combinedSteps, (x) => x);
  console.log( minSteps);
};

main();
