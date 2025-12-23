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
  if (state.input.length === 0) return ip;

  const dest = memory[ip + 1];
  memory[dest] = state.input.shift();

  return ip + 2;
};

const add = () =>binaryOp((a, b) => a + b);
const mul = ()=>binaryOp((a, b) => a * b);
const lessThan =()=> binaryOp((a, b) => (a < b ? 1 : 0));
const equalsOp = ()=>binaryOp((a, b) => (a === b ? 1 : 0));
const jumpIfTrue = ()=>jumpOp((x) => x !== 0);
const jumpIfFalse =()=> jumpOp((x) => x === 0);

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
});

// const execute = (memory, opcode, ip, modes) => {
//   const op = opcodes[opcode];
//   return op(memory, ip, modes);
// };

const performInstruction = (state) => {
  while (state.memory[state.ip] !== 99) {
    const { opcode, modes } = parseInstruction(state.memory[state.ip]);
    state.ip = opcodes[opcode](state.memory, state.ip, modes, state);
  }
};

const runAmplifiers = (program)=> {
const phases = [4,3,2,1,0];
const states = phases.map((phase, index) =>
  createState(program, index === 0 ? [phase, 0] : [phase])
);
for (let i = 0; i < states.length; i++) {
  performInstruction(states[i]);
  if (i < states.length - 1) {
    states[i + 1].input.push(states[i].output[0]);
  }
}
console.log(states);
return  states[states.length-1].output[0];
}

const main = (input) => {
  const program = convertInput(input);
  const thrusterSignal = runAmplifiers(program);
  console.log("Thruster signal:", thrusterSignal);
};

// main(Deno.readTextFileSync("../intcode/input1.txt"));
main(`3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`);