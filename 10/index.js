const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(line);
  }
  return result;
};

const checkSyntax = (chunk) => {
  const stack = [];
  const opening_characters = ["(", "[", "{", "<"];
  const closing_characters = [")", "]", "}", ">"];
  const points = {
    [closing_characters[0]]: 3,
    [closing_characters[1]]: 57,
    [closing_characters[2]]: 1197,
    [closing_characters[3]]: 25137,
  };
  for (const character of chunk) {
    if (opening_characters.includes(character)) {
      stack.push(character);
    } else {
      const index = closing_characters.indexOf(character);
      if (stack.pop() !== opening_characters[index]) {
        return points[character];
      }
    }
  }
  return 0;
};

const solve1 = (input) =>
  input.reduce((prev, curr) => prev + checkSyntax(curr), 0);

const getScore = (chunk) => {
  const stack = [];
  const opening_characters = ["(", "[", "{", "<"];
  const closing_characters = [")", "]", "}", ">"];
  const points = {
    [closing_characters[0]]: 1,
    [closing_characters[1]]: 2,
    [closing_characters[2]]: 3,
    [closing_characters[3]]: 4,
  };
  for (const character of chunk) {
    if (opening_characters.includes(character)) {
      stack.push(character);
    } else {
      stack.pop();
    }
  }
  const completion_string = stack
    .reverse()
    .reduce(
      (prev, curr) =>
        prev.concat(closing_characters[opening_characters.indexOf(curr)]),
      ""
    );
  let score = 0;
  for (const character of completion_string) {
    score *= 5;
    score += points[character];
  }
  return score;
};

const solve2 = (input) => {
  const incomplete_chunks = input.filter((chunk) => checkSyntax(chunk) === 0)
  const scores = incomplete_chunks.map((chunk) => getScore(chunk))
  return scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)]
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
