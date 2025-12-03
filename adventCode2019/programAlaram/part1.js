const input = Deno.readTextFileSync("input1.txt");
const arrayinput = input.split(",");
const numArray = arrayinput.map(x=>parseInt(x));
const add = (array,index) => {
  const result = array[array[index+1]] + array[array[index+2]];
  array[array[index+3]] = result;
  return [array,index+4];
}
const mul = (array,index) => {
  const result = array[array[index+1]] * array[array[index+2]];
  array[array[index+3]] = result;
  return [array,index+4];
}
const excute = function (memory,oppcode, index) {
  
  switch (oppcode) {
    case 1: return add(memory, index);
    case 2: return mul(memory, index);
    case 99: return [memory,memory.length];
  }
  return [memory,index+1];
}
const performInstruction = (memory) => {
let index = 0;
while(index < memory.length){
  const oppcode = memory[index];
  [memory,index] = excute(memory,oppcode,index);
}
return memory;
}
numArray[1]=12;
numArray[2]=2;
console.log(input);
const result = performInstruction(numArray)
console.log(result[0]);
