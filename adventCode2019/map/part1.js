const doSomeThing = (input) => {
  const values = input.split("\n");
  return values.reduce((map, value) => {
    const [parent, child] = value.split(")");
    map[child] = parent;
    return map;
  },{});
};
const countSteps = (map) => {
  let count  = 0;
  for(const obj in map){
    let current = obj;
    while(map[current]){
     count++;
     current = map[current];
    }
  }
  return count;
}
const main =  () => {
  const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;
// const input = Deno.readTextFileSync("input.txt");
const map = doSomeThing(input);
console.log(countSteps(map));
}
main();