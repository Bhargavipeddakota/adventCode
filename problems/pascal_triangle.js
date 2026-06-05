const pascalTriangle = (rows) => {
  const triangle = [[1]];

  for (let row = 1; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col <= row; col++) {
      const value = (col === 0 || col === row)
        ? 1
        : triangle[row - 1][col - 1] + triangle[row - 1][col];
      currentRow.push(value);
    }
    triangle.push(currentRow);
  }
 
  return triangle;
};
const triangle = pascalTriangle(5);
console.log(triangle);
