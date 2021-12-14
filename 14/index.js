const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const rules = {};
  let polymer = "";
  let first_line = true;
  for await (const line of rl) {
    if (first_line) {
      polymer = line;
      first_line = false;
    } else if (line !== "") {
      rules[line.split(" -> ")[0]] = line.split(" -> ")[1];
    }
  }
  return [polymer, rules];
};

const solve1 = (polymer, rules) => {
  const N_STEPS = 10;
  let polymer_copy = polymer.slice();
  for (let i = 0; i < N_STEPS; i++) {
    for (let j = 0; j < polymer_copy.length; j++) {
      if (rules[`${polymer_copy[j]}${polymer_copy[j + 1]}`]) {
        polymer_copy = `${polymer_copy.slice(0, j + 1)}${
          rules[`${polymer_copy[j]}${polymer_copy[j + 1]}`]
        }${polymer_copy.slice(j + 1)}`;
        j++;
      }
    }
  }
  const characters_count = {};
  for (const character of polymer_copy) {
    characters_count[character] = characters_count[character]
      ? characters_count[character] + 1
      : 1;
  }
  const sorted_count = Object.values(characters_count).sort((a, b) => a - b);
  const least_common_character_count = sorted_count[0];
  const most_common_character_count = sorted_count[sorted_count.length - 1];
  return most_common_character_count - least_common_character_count;
};

const solve2 = (polymer, rules) => {
  return 2;
};

readFile("input.txt").then(([polymer, rules]) => {
  console.log(`solution to part 1: ${solve1(polymer, rules)}`);
  console.log(`solution to part 2: ${solve2(polymer, rules)}`);
});
