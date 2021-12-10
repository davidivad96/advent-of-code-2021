const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(parseInt(line));
  }
  return result;
};

const solve1 = (input) => {
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      count++;
    }
  }
  return count;
};

const solve2 = (input) => {
  let count = 0;
  let sum = input[0] + input[1] + input[2];
  for (let i = 1; i < input.length - 2; i++) {
    if (input[i] + input[i + 1] + input[i + 2] > sum) {
      count++;
    }
    sum = input[i] + input[i + 1] + input[i + 2];
  }
  return count;
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
