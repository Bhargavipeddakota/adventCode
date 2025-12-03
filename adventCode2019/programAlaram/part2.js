const convertInput = () => {
  const input = Deno.readTextFileSync("input1.txt");
  const arrayinput = input.split(",");
  const numArray = arrayinput.map((x) => parseInt(x));
  return numArray;
};

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
const excute = function (memory, oppcode, index) {
  switch (oppcode) {
    case 1:
      return add(memory, index);
    case 2:
      return mul(memory, index);
    case 99:
      return [memory, memory.length];
  }
  return [memory, index + 1];
};
const performInstruction = (memory) => {
  let index = 0;
  while (index < memory.length) {
    const oppcode = memory[index];
    [memory, index] = excute(memory, oppcode, index);
  }
  return memory;
};
const doSomething = () => {
  let result = [];
for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const actualInput = convertInput();
    actualInput[1] = noun;
    actualInput[2] =verb;
    result = performInstruction(actualInput);
    if(result[0] === 19690720){
      return [noun,verb];
    }
  }
}
}
const [noun,verb] = doSomething();
const outPut = (noun*100) + verb;
console.log(outPut);
