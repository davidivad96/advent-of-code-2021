const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(Number(line.split(": ")[1]));
  }
  return result;
};

const solve1 = (input) => {
  const input_copy = [...input];
  const scores = [0, 0];
  const WIN_SCORE = 1000;
  let current_player = 0;
  let dice = 0;
  while (scores[0] < WIN_SCORE && scores[1] < WIN_SCORE) {
    let stop_space = (input_copy[current_player] + 3 * dice + 6) % 10;
    if (stop_space === 0) {
      stop_space = 10;
    }
    scores[current_player] += stop_space;
    input_copy[current_player] = stop_space;
    current_player = current_player === 0 ? 1 : 0;
    dice += 3;
  }
  return Math.min(...scores) * dice;
};

const solve2 = (input) => {
  return 2;
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
