export function transpose(matrix) {
  let transposed = Array.from({ length: matrix[0].length }, () => []);

  for (let y = 0; y < matrix.length; ++y)
    for (let x = 0; x < matrix[0].length; ++x) transposed[x][y] = matrix[y][x];

  return transposed;
}
