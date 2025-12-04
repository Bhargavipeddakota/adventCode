import { sortBy } from "jsr:@std/collections";
const isRepetedTwice = (number) => {
  const str = number.toString().split("");
  for (let i = 0; i < str.length; i++) {
      let count = 0;
    for (let j = 0; j < str.length; j++) {
      if (str[i] === str[j]) count++;
    }
    if (count === 2) return true;
  }
  return false;
};

const range = "235741-706948".split("-");
const passwords = [];

const isInIncreasingOrder = (number) => {
  const str = number.toString();
  return parseInt(sortBy(str, (x) => x).join("")) === number;
};

for (let number = range[0]; number < range[1]; number++) {
  if (isInIncreasingOrder(number) && isRepetedTwice(number)) {
    passwords.push(number);
  }
}

console.log(passwords.length);