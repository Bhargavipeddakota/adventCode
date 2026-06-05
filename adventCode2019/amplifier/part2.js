import { permutations } from "jsr:@std/collections/permutations";

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

const print = (memory, ip, modes, state) => {
  const value = getParam(memory, ip, 1, modes[0]);
  state.output.push(value);
  return ip + 2;
};

const takeInput = (memory, ip, modes, state) => {
  if (state.input.length === 0) {
    return ip;
  }
  const dest = memory[ip + 1];
  memory[dest] = state.input.shift();
  return ip + 2;
};

const add = () => binaryOp((a, b) => a + b);
const mul = () => binaryOp((a, b) => a * b);
const lessThan = () => binaryOp((a, b) => (a < b ? 1 : 0));
const equalsOp = () => binaryOp((a, b) => (a === b ? 1 : 0));
const jumpIfTrue = () => jumpOp((x) => x !== 0);
const jumpIfFalse = () => jumpOp((x) => x === 0);

const opcodes = {
  1: add(),
  2: mul(),
  3: takeInput,
  4: print,
  5: jumpIfTrue(),
  6: jumpIfFalse(),
  7: lessThan(),
  8: equalsOp(),
};
const createState = (memoryInput, inputArray = []) => ({
  memory: [...memoryInput],
  ip: 0,
  input: [...inputArray],
  output: [],
  halted: false,
});

const performInstruction = (state) => {
  const instruction = state.memory[state.ip];
  if (instruction === 99) {
    state.halted = true;
    return;
  }
  const { opcode, modes } = parseInstruction(instruction);
  const nextIp = opcodes[opcode](state.memory, state.ip, modes, state);
 if (opcode === 3 && nextIp === state.ip) return;
  state.ip = nextIp;
};

const runEachAmpilifier = (states) => {
  let i = 0;
  let lastOutput;
  while (!states[states.length - 1].halted) {
    const state = states[i];
    performInstruction(state);
    const out = state.output.shift();
    if (out !== undefined) {
      lastOutput = out;
      states[(i + 1) % states.length].input.push(out);
    }
    i = (i + 1) % states.length;
  }
  return lastOutput;
};

const runAmplifiersWithFeedback = (program) => {
  const permutationsPhases = permutations([5, 6, 7, 8, 9]);
  let thrusterSignals = [];

  for (const phases of permutationsPhases) {
    const states = phases.map((phase) =>
      createState(program, [phase])
    );
    states[0].input.push(0);
    thrusterSignals.push(runEachAmpilifier(states));
  }

  return thrusterSignals;
};


const main = (input) => {
  const program = convertInput(input);
  const thrusterSignal = runAmplifiersWithFeedback(program);
  console.log(`max thrusterSignel:`, Math.max(...thrusterSignal));
};

main(Deno.readTextFileSync("./input2.txt"));

// main(`3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`);
