const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  let max_x = 0;
  let max_y = 0;
  for await (const line of rl) {
    const coordinates_1 = line.split(" -> ")[0];
    const coordinates_2 = line.split(" -> ")[1];
    const x1 = coordinates_1.split(",")[0];
    const y1 = coordinates_1.split(",")[1];
    const x2 = coordinates_2.split(",")[0];
    const y2 = coordinates_2.split(",")[1];
    result.push([
      [Number(x1), Number(y1)],
      [Number(x2), Number(y2)],
    ]);
    max_x = Math.max(max_x, x1, x2);
    max_y = Math.max(max_y, y1, y2);
  }
  return [result, max_x, max_y];
};

const solve1 = (input, max_x, max_y) => {
  const map = Array.from({ length: max_x + 1 }, () =>
    Array.from({ length: max_y + 1 }, () => ".")
  );
  input.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
        map[i][x1] = map[i][x1] === "." ? 1 : map[i][x1] + 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i < Math.max(x1, x2) + 1; i++) {
        map[y1][i] = map[y1][i] === "." ? 1 : map[y1][i] + 1;
      }
    }
  });
  return map.flat().filter((x) => x !== "." && x > 1).length;
};

const solve2 = (input, max_x, max_y) => {
  const map = Array.from({ length: max_x + 1 }, () =>
    Array.from({ length: max_y + 1 }, () => 0)
  );
  input.forEach(([[x1, y1], [x2, y2]]) => {
    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      let j = x1 < x2 ? y1 : y2;
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        map[j][i] = map[j][i] === 0 ? 1 : map[j][i] + 1;
        j += j < (x1 < x2 ? y2 : y1) ? 1 : -1;
      }
    } else if (x1 === x2) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
        map[i][x1] = map[i][x1] === 0 ? 1 : map[i][x1] + 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i < Math.max(x1, x2) + 1; i++) {
        map[y1][i] = map[y1][i] === 0 ? 1 : map[y1][i] + 1;
      }
    }
  });
  return map.flat().filter((x) => x !== "." && x > 1).length;
};

readFile("input.txt").then(([input, max_x, max_y]) => {
  console.log(`solution to part 1: ${solve1(input, max_x, max_y)}`);
  console.log(`solution to part 2: ${solve2(input, max_x, max_y)}`);
});
