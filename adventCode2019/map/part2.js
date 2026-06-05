import { intersect } from "@std/collections/intersect";
const doSomeThing = (input) => {
  const values = input.split("\n");
  return values.reduce((map, value) => {
    const [parent, child] = value.split(")");
    map[child] = parent;
    return map;
  }, {});
};
const findPath = (map, obj) => {
  const path = [];
  let current = obj;
  while (map[current]) {
    current = map[current];
    path.push(current);
  }
  return path;
};
const main = () => {
//   const input = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN`;
  const input = Deno.readTextFileSync("input2.txt");
  const map = doSomeThing(input);
  const myPath = findPath(map, "YOU");
  const sanPath = findPath(map, "SAN");
  const commonOrbit = intersect(myPath, sanPath);
  console.log(commonOrbit)
  console.log( myPath.indexOf(commonOrbit[0])+sanPath.indexOf(commonOrbit[0]));
};
main();
