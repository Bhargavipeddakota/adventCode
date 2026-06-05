const fibonacciUpto = (limit) => {
  let [currentTerm, nextTerm] = [1, 2];
  const series = [];

  while (currentTerm <= limit) {
    series.push(currentTerm);
    [currentTerm, nextTerm] = [nextTerm, currentTerm + nextTerm];
  }

  return series;
};
/* const fibonacciUpto = (limit) => {
  const series = [1, 2];
  if (limit === 1) {
    return [1];
  }
  let index = 0;
  while (series[index] < limit) {
    const nextvalue = series[index] + series[index + 1];
    series.push(nextvalue);
    index++;
  }
  return series;
};
 */

const main = () => {
  const series = fibonacciUpto(10);

  return series
    .filter((x) => !(x & 1))
    .reduce((sum, number) => sum + number);
};

console.log(main());
