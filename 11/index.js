const fs = require("fs");
const readline = require("readline");

let n_rows = -1;
let n_cols = -1;

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(line.split("").map(Number));
  }
  n_rows = result.length;
  n_cols = result[0].length;
  return result;
};

const simulateStep = (energy) => {
  let result = 0;
  for (let i = 0; i < n_rows; i++) {
    for (let j = 0; j < n_cols; j++) {
      energy[i][j] = (energy[i][j] + 1) % 10;
    }
  }
  const already_flashed = Array.from({ length: n_rows }, () =>
    Array.from({ length: n_cols }, () => false)
  );
  let stop = false;
  while (!stop) {
    stop = true;
    for (let i = 0; i < n_rows; i++) {
      for (let j = 0; j < n_cols; j++) {
        if (energy[i][j] === 0 && !already_flashed[i][j]) {
          already_flashed[i][j] = true;
          stop = false;
          result++;
          if (energy?.[i - 1]?.[j - 1]) {
            energy[i - 1][j - 1] = (energy[i - 1][j - 1] + 1) % 10;
          }
          if (energy?.[i - 1]?.[j]) {
            energy[i - 1][j] = (energy[i - 1][j] + 1) % 10;
          }
          if (energy?.[i - 1]?.[j + 1]) {
            energy[i - 1][j + 1] = (energy[i - 1][j + 1] + 1) % 10;
          }
          if (energy?.[i]?.[j - 1]) {
            energy[i][j - 1] = (energy[i][j - 1] + 1) % 10;
          }
          if (energy?.[i]?.[j + 1]) {
            energy[i][j + 1] = (energy[i][j + 1] + 1) % 10;
          }
          if (energy?.[i + 1]?.[j - 1]) {
            energy[i + 1][j - 1] = (energy[i + 1][j - 1] + 1) % 10;
          }
          if (energy?.[i + 1]?.[j]) {
            energy[i + 1][j] = (energy[i + 1][j] + 1) % 10;
          }
          if (energy?.[i + 1]?.[j + 1]) {
            energy[i + 1][j + 1] = (energy[i + 1][j + 1] + 1) % 10;
          }
        }
      }
    }
  }
  return result;
};

const copyArray = (arr) =>
  Array.from({ length: arr.length }, (_, i) =>
    Array.from({ length: arr[0].length }, (_, j) => arr[i][j])
  );

const solve1 = (input) => {
  const N = 100;
  const energy = copyArray(input);
  let flashes = 0;
  for (let i = 0; i < N; i++) {
    flashes += simulateStep(energy);
  }
  return flashes;
};

const solve2 = (input) => {
  let n_steps = 0;
  const energy = copyArray(input);
  let stop = false;
  while (!stop) {
    const flashes = simulateStep(input);
    if (flashes === n_rows * n_cols) {
      stop = true;
    }
    n_steps++;
  }
  return n_steps;
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
