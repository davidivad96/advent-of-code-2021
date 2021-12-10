const fs = require("fs");
const readline = require("readline");

let N = -1;
let M = -1;

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(line.split("").map(Number));
  }
  N = result.length;
  M = result[0].length;
  return result;
};

const getAdjacents = (cave, i, j) => ({
  up: i > 0 ? cave[i - 1][j] : Number.MAX_VALUE,
  down: i < N - 1 ? cave[i + 1][j] : Number.MAX_VALUE,
  left: j > 0 ? cave[i][j - 1] : Number.MAX_VALUE,
  right: j < M - 1 ? cave[i][j + 1] : Number.MAX_VALUE,
});

const solve1 = (input) => {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const current = input[i][j];
      const { up, down, left, right } = getAdjacents(input, i, j);
      if (up > current && down > current && left > current && right > current) {
        sum += 1 + current;
      }
    }
  }
  return sum;
};

const findBasin = (cave, locations, already_visited, accumulated_sum) => {
  const new_locations = [];
  for (const location of locations) {
    const x = location[0];
    const y = location[1];
    const current = cave[x][y];
    const { up, down, left, right } = getAdjacents(cave, x, y);
    if (
      up > current &&
      up < 9 &&
      !already_visited.find((val) => val[0] === x - 1 && val[1] === y)
    ) {
      new_locations.push([x - 1, y]);
      already_visited.push([x - 1, y]);
    }
    if (
      down > current &&
      down < 9 &&
      !already_visited.find((val) => val[0] === x + 1 && val[1] === y)
    ) {
      new_locations.push([x + 1, y]);
      already_visited.push([x + 1, y]);
    }
    if (
      left > current &&
      left < 9 &&
      !already_visited.find((val) => val[0] === x && val[1] === y - 1)
    ) {
      new_locations.push([x, y - 1]);
      already_visited.push([x, y - 1]);
    }
    if (
      right > current &&
      right < 9 &&
      !already_visited.find((val) => val[0] === x && val[1] === y + 1)
    ) {
      new_locations.push([x, y + 1]);
      already_visited.push([x, y + 1]);
    }
  }
  if (new_locations.length === 0) {
    return accumulated_sum;
  }
  return findBasin(
    cave,
    new_locations,
    already_visited,
    accumulated_sum + new_locations.length
  );
};

const solve2 = (input) => {
  const basins = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const current = input[i][j];
      const { up, down, left, right } = getAdjacents(input, i, j);
      if (up > current && down > current && left > current && right > current) {
        const basin = findBasin(input, [[i, j]], [], 1);
        basins.push(basin);
      }
    }
  }
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev * curr, 1);
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
