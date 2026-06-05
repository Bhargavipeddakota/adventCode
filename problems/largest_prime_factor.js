// 13195 29
const primeFactorsOfNum = (num) => {
  let number = num;
  const numbers = [];
  for (let divisor = 2; divisor * divisor <= num; divisor++) {
    while (number % divisor === 0) {
      numbers.push(divisor);
      number = number / divisor;
    }
  }
  return numbers;
}

const primeFactors = primeFactorsOfNum(600851475143)
console.log(Math.max(...primeFactors));
