const values: number[][] = [
  [1, 2, 3, 4, 5],
  [3, 4, 5, 6, 7],
  [6, 7, 8, 9, 10],
];
function calculateMinMax(values: number[][]): number {
  const maximumValueOfArray: number[] = values.map((value: number[]) =>
    Math.max(...value)
  );

  return Math.min(...maximumValueOfArray);
}

console.log(calculateMinMax(values));
