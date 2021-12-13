const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const dots = [];
  const instructions = [];
  let max_x = 0;
  let max_y = 0;
  let first_lines = true;
  for await (const line of rl) {
    if (first_lines) {
      if (line === "") {
        first_lines = false;
      } else {
        const x = Number(line.split(",")[0]);
        const y = Number(line.split(",")[1]);
        dots.push([x, y]);
        max_x = Math.max(max_x, x);
        max_y = Math.max(max_y, y);
      }
    } else {
      const axis = line.split(" ")[2].split("=")[0];
      const val = Number(line.split(" ")[2].split("=")[1]);
      instructions.push([axis, val]);
    }
  }
  return [dots, instructions, max_x, max_y];
};

const markCoordinates = (paper, dots) => {
  for (const dot of dots) {
    paper[dot[1]][dot[0]] = "#";
  }
};

const foldUp = (paper, line) => {
  for (let i = 0; i < line; i++) {
    for (let j = 0; j < paper[i].length; j++) {
      if (paper[i + line + 1]?.[j] === "#") {
        paper[line - i - 1][j] = "#";
      }
    }
  }
  paper.splice(line);
};

const foldLeft = (paper, line) => {
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < line; j++) {
      if (paper[i]?.[j + line + 1] === "#") {
        paper[i][line - j - 1] = "#";
      }
    }
  }
  paper.forEach((row) => row.splice(line));
};

const solve1 = (dots, instruction, max_x, max_y) => {
  const paper = Array.from({ length: max_y }, () =>
    Array.from({ length: max_x }, () => ".")
  );
  markCoordinates(paper, dots);
  if (instruction[0] === "y") {
    foldUp(paper, instruction[1]);
  } else {
    foldLeft(paper, instruction[1]);
  }
  return paper.reduce(
    (prev, curr) => prev + curr.filter((val) => val === "#").length,
    0
  );
};

const solve2 = (dots, instructions, max_x, max_y) => {
  const paper = Array.from({ length: max_y }, () =>
    Array.from({ length: max_x }, () => ".")
  );
  markCoordinates(paper, dots);
  instructions.forEach((instruction) => {
    if (instruction[0] === "y") {
      foldUp(paper, instruction[1]);
    } else {
      foldLeft(paper, instruction[1]);
    }
  });
  return paper;
};

readFile("input.txt").then(([dots, instructions, max_x, max_y]) => {
  console.log(
    `solution to part 1: ${solve1(dots, instructions[0], max_x + 1, max_y + 1)}`
  );
  console.log(
    `solution to part 2: ${solve2(dots, instructions, max_x + 1, max_y + 1)}`
  );
});
