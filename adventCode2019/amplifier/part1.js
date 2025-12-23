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
  return [str.slice(0, 3), str[3] + str[4]]
    .flat()
    .map((x) => parseInt(x));
};

// const handleMode = (instruction, ip, memory, offset) => {
//   return instruction[instruction.length - offset]
//     ? ip + (offset - 1)
//     : memory[ip + (offset - 1)];
// };

const getParam = (memory, ip, offset, mode) => {
  const param = memory[ip + offset];
  return mode === 1 ? param : memory[param];
};

const binaryOp = (fn) => (memory, ip, modes) => {
  const a = getParam(memory, ip, 1, modes[0]);
  const b = getParam(memory, ip, 2, modes[1]);
  const dest = memory[ip + 3];

  memory[dest] = fn(a, b);
  return ip + 4;
};

const print = (memory,ip,instruction) => {
  const index = handleMode(instruction, ip, memory, 2);
  console.log(memory[index]);
  return ip + 2;
};
const takeInput = (memory,index,instruction) => {
  memory[memory[index + 1]] = +prompt("Enter input:");
  return index + 2
};
const add = (memory, ip, instruction) => {
  const arg1 = handleMode(instruction, ip, memory, 2);
  const arg2 = handleMode(instruction, ip, memory, 3);
  const result = handleMode(instruction, ip, memory, 4);
  memory[result] = memory[arg1] + memory[arg2];
  return ip + 4;
};
const mul = (memory, ip,instruction) => {
  const arg1 = handleMode(instruction, ip, memory, 2);
  const arg2 = handleMode(instruction, ip, memory, 3);
  const result = handleMode(instruction, ip, memory, 4);
  memory[result] = memory[arg1] * memory[arg2];
  return ip + 4;
};
const jumpIfTrue = (memory, ip,instruction) => {
  const p1 = handleMode(instruction, ip, memory, 2);
  const p2 = handleMode(instruction, ip, memory, 3);

  if (memory[p1] !== 0) return memory[p2];
  return ip + 3;
};

const jumpIfFalse = (memory,ip,instruction ) => {
  const p1 = handleMode(instruction, ip, memory, 2);
  const p2 = handleMode(instruction, ip, memory, 3);

  if (memory[p1] === 0) return memory[p2];
  return ip + 3;
};

const lessThan = (memory,ip,instruction) => {
  const p1 = handleMode(instruction, ip, memory, 2);
  const p2 = handleMode(instruction, ip, memory, 3);
  const dest  = memory[ip + 3];

  memory[dest] = memory[p1] < memory[p2] ? 1 : 0;
  return ip + 4;
};

const equalsOp = (memory,ip,instruction) => {
  const p1 = handleMode(instruction, ip, memory, 2);
  const p2 = handleMode(instruction, ip, memory, 3);
  const dest = memory[ip + 3];

  memory[dest] = memory[p1] === memory[p2] ? 1 : 0;
  return ip + 4;
};

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

const excute = (memory, opcode, index) => {
  const op = opcodes[opcode[opcode.length-1]];
  return op(memory,index,opcode);
}

const performInstruction = (memory) => {
  let ip = 0;
  while (memory[ip] !== 99 && ip < memory.length) {
    const oppcode = memory[ip];
    const instruction = parseInstruction(oppcode);
    ip = excute(memory, instruction, ip);
  }
};

const main = (input) => {
  const memory = convertInput(input);
  performInstruction(memory);
};
// const input = "3,0,4,0,99"
main(Deno.readTextFileSync("../intcode/input1.txt"));

