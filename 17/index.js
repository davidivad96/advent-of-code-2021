const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    const ranges = line.split(": ")[1];
    const x_range = ranges.split(", ")[0].slice(2);
    const y_range = ranges.split(", ")[1].slice(2);
    result.push([
      Number(x_range.split("..")[0]),
      Number(x_range.split("..")[1]),
    ]);
    result.push([
      Number(y_range.split("..")[0]),
      Number(y_range.split("..")[1]),
    ]);
  }
  return result;
};

const solve1 = (input) => {
  const N_ITERS = 1000;
  let highest_y = 0;
  for (let i = -N_ITERS; i < N_ITERS; i++) {
    for (let j = -N_ITERS; j < N_ITERS; j++) {
      let x_position = 0;
      let y_position = 0;
      let x_velocity = i;
      let y_velocity = j;
      while (x_position < input[0][1] && y_position > input[1][0]) {
        x_position += x_velocity;
        y_position += y_velocity;
        x_velocity = x_velocity > 0 ? x_velocity - 1 : 0;
        y_velocity--;
        if (
          x_position >= input[0][0] &&
          x_position <= input[0][1] &&
          y_position >= input[1][0] &&
          y_position <= input[1][1]
        ) {
          let current_highest_y = (j * (j + 1)) / 2;
          if (current_highest_y > highest_y) {
            highest_y = current_highest_y;
          }
        }
      }
    }
  }
  return highest_y;
};

const solve2 = (input) => {
  const N_ITERS = 1000;
  let valid_initial_velocities_sum = 0;
  for (let i = -N_ITERS; i < N_ITERS; i++) {
    for (let j = -N_ITERS; j < N_ITERS; j++) {
      let x_position = 0;
      let y_position = 0;
      let x_velocity = i;
      let y_velocity = j;
      let is_valid = false;
      while (
        x_position < input[0][1] &&
        y_position > input[1][0] &&
        !is_valid
      ) {
        x_position += x_velocity;
        y_position += y_velocity;
        x_velocity = x_velocity > 0 ? x_velocity - 1 : 0;
        y_velocity--;
        if (
          x_position >= input[0][0] &&
          x_position <= input[0][1] &&
          y_position >= input[1][0] &&
          y_position <= input[1][1]
        ) {
          valid_initial_velocities_sum++;
          is_valid = true;
        }
      }
    }
  }
  return valid_initial_velocities_sum;
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
