const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(line.split(""));
  }
  return result;
};

const copyArray = (arr) =>
  Array.from({ length: arr.length }, (_, i) =>
    Array.from({ length: arr[0].length }, (_, j) => arr[i][j])
  );

const simulateStep = (map) => {
  const N = map.length;
  const M = map[0].length;
  let initial_map = copyArray(map);
  let can_move = false;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (initial_map[i][j] === ">" && initial_map[i][(j + 1) % M] === ".") {
        map[i][(j + 1) % M] = ">";
        map[i][j] = ".";
        can_move = true;
      }
    }
  }
  initial_map = copyArray(map);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (initial_map[i][j] === "v" && initial_map[(i + 1) % N][j] === ".") {
        map[(i + 1) % N][j] = "v";
        map[i][j] = ".";
        can_move = true;
      }
    }
  }
  return can_move;
};

const solve1 = (input) => {
  const map = copyArray(input);
  let can_move = true;
  let n_steps = 0;
  while (can_move) {
    can_move = simulateStep(map);
    n_steps++;
  }
  return n_steps;
};

const solve2 = (input) => {
  return 2;
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
