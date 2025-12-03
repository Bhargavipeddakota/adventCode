import { sumOf } from "jsr:@std/collections";

const someThing = (number,a) => {
 let  result = process(number);
 if(result >= 0){
a.push(result);
result = someThing(result,a);
}
return a;
}

const input = Deno.readTextFileSync("input2.txt");
const inputArray = input.split("\n");
const process = (number) => Math.floor(number/3)-2;
const eachModuleResult = inputArray.map(num => someThing(parseInt(num),[]));


const sumOfEachModule = eachModuleResult.map((result)=> sumOf(result,(x) => x));
console.log(sumOf(sumOfEachModule, (num) => num));