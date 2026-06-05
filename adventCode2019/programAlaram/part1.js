import { chunk } from "jsr:@std/collections";
const input = Deno.readTextFileSync("input1.txt");
// const input = "1,0,0,0,2,3,0,3,1,1,0,0,99";
const arrayinput = input.split(",");
const program = arrayinput.map((x) => parseInt(x));

const add = (array, index) => {
  const result = array[array[index + 1]] + array[array[index + 2]];
  array[array[index + 3]] = result;
  return [array, index + 4];
};

const mul = (array, index) => {
  const result = array[array[index + 1]] * array[array[index + 2]];
  array[array[index + 3]] = result;
  return [array, index + 4];
};
const opcodes = {
  1: add,
  2: mul,
  99: (mem) => [mem, mem.length],
};


const excute = (memory, opcode, index) => {
  const op = opcodes[opcode];
  const [mem, nextIndex] = op(memory, index);
  return { memory: mem, index: nextIndex };
};

const performInstruction = (memory) => {
  let index = 0;
  while (index < memory.length) {
    const opcode = memory[index];
    ({ memory, index } = excute(memory, opcode, index));
  }
  return memory;
};

const getOpcode = (state) => state.memory[state.index];
const display = (program) => {
  const p1 = program.map((x) => x.toString().padStart(7));
  const r = chunk(p1, 10).join("\n");
  console.log(r);
};
const showState = (state) => {
  console.log(`IP: ${state.index}`);
  console.log(`Opcode: ${getOpcode(state)}\n`);
  display(state.memory);
};

const stepDebugger = (program) => {
  let state = { memory: [...program], index: 0, step: 0, halted: false };
  while (!state.halted && state.index < state.memory.length) {
    const opcode = getOpcode(state);
    console.clear();
    showState(state);
     prompt();
    state = excute(state.memory,opcode,state.index);
  }
};

stepDebugger(program);
// performInstruction(program);