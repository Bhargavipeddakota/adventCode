import { sortBy } from "jsr:@std/collections";
const range = "235741-706948".split("-");
const passwords = [];

const isInIncreasingOrder = (number) => {
  const str = number.toString();
  return parseInt(sortBy(str,(x) => x).join("")) === number
}

const isRepeted = (number) => {
  const str = number.toString();
  return /(\d)\1/.test(str);
}

for (let number = range[0]; number < range[1]; number++) {
  if(isRepeted(number) && isInIncreasingOrder(number)){
    passwords.push(number);
  }
}

console.log(passwords.length);