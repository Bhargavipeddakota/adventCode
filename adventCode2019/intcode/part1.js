const dbg = (x) => {
  console.log(x);
  return x;
};

const convertInput = (input) => {
  const arrayinput = input.split(",");
  const numArray = arrayinput.map((x) => parseInt(x));
  return numArray;
};

const parseInstruction = (instruction) => {
  const str = [...`${instruction}`.padStart(5, 0)];
  const opcode = +(str[3] + str[4]);
  const modes = [str.slice(0, 3)]
    .flat()
    .map((x) => parseInt(x)).reverse();
  return { opcode, modes };
};

const getParam = (memory, ip, offset, mode) => {
  const param = memory[ip + offset];
  return mode === 1 ? param : memory[param];
};

const binaryOp = (operation) => (memory, ip, modes) => {
  const a = getParam(memory, ip, 1, modes[0]);
  const b = getParam(memory, ip, 2, modes[1]);
  const dest = memory[ip + 3];

  memory[dest] = operation(a, b);
  return ip + 4;
};

const jumpOp = (predicate) => (memory, ip, modes) => {
  const arg1 = getParam(memory, ip, 1, modes[0]);
  const arg2 = getParam(memory, ip, 2, modes[1]);

  return predicate(arg1) ? arg2 : ip + 3;
};

const print = (memory, ip, modes) => {
  const value = getParam(memory, ip, 1, modes[0]);
  console.log(value);
  return ip + 2;
};

const takeInput = (memory, ip) => {
  const dest = memory[ip + 1];
  memory[dest] = +prompt("Enter input:");
  return ip + 2;
};

const add = binaryOp((a, b) => a + b);
const mul = binaryOp((a, b) => a * b);
const jumpIfTrue = jumpOp((x) => x !== 0);
const jumpIfFalse = jumpOp((x) => x === 0);
const lessThan = binaryOp((a, b) => (a < b ? 1 : 0));
const equalsOp = binaryOp((a, b) => (a === b ? 1 : 0));

const opcodes = {
  1: add,
  2: mul,
  3: takeInput,
  4: print,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equalsOp,
};

const execute = (memory, opcode, ip, modes) => {
  const op = opcodes[opcode];
  return op(memory, ip, modes);
};

const performInstruction = (memory) => {
  let ip = 0;

  while (memory[ip] !== 99) {
    const { opcode, modes } = parseInstruction(memory[ip]);
    ip = execute(memory, opcode, ip, modes);
  }
};

const main = (input) => {
  const memory = convertInput(input);
  performInstruction(memory);
};
// const input = "3,0,4,0,99";
// main(input);

main(Deno.readTextFileSync("../intcode/input1.txt"));
