const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  let algorithm = "";
  const input_image = [];
  let first_line = true;
  for await (const line of rl) {
    if (first_line) {
      algorithm = line;
      first_line = false;
    } else if (line) {
      input_image.push(line.split(""));
    }
  }
  return [algorithm, input_image];
};

const copyArray = (arr) =>
  Array.from({ length: arr.length }, (_, i) =>
    Array.from({ length: arr[0].length }, (_, j) => arr[i][j])
  );

const binToDec = (bin) => Number(parseInt(bin, 2).toString(10));

const expandImage = (input_image, default_pixel) => {
  const result = copyArray(input_image);
  for (let i = 0; i < input_image.length; i++) {
    result[i].unshift(default_pixel);
    result[i].push(default_pixel);
  }
  result.unshift(Array.from({ length: result[0].length }, () => default_pixel));
  result.push(Array.from({ length: result[0].length }, () => default_pixel));
  return result;
};

const calculateOutputImage = (input_image, algorithm, default_pixel) => {
  const result = copyArray(input_image);
  const N = input_image.length;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const region = `
        ${input_image[i - 1]?.[j - 1] || default_pixel}
        ${input_image[i - 1]?.[j] || default_pixel}
        ${input_image[i - 1]?.[j + 1] || default_pixel}
        ${input_image[i]?.[j - 1] || default_pixel}
        ${input_image[i]?.[j] || default_pixel}
        ${input_image[i]?.[j + 1] || default_pixel}
        ${input_image[i + 1]?.[j - 1] || default_pixel}
        ${input_image[i + 1]?.[j] || default_pixel}
        ${input_image[i + 1]?.[j + 1] || default_pixel}
      `.replace(/\s/g, "");
      const binary = region.replace(/\./g, "0").replace(/\#/g, "1");
      const index = binToDec(binary);
      result[i][j] = algorithm[index];
    }
  }
  return result;
};

const solve1 = (algorithm, input_image) => {
  const N_STEPS = 2;
  let default_pixel = ".";
  let image = expandImage(input_image, default_pixel);
  for (let i = 0; i < N_STEPS; i++) {
    const output_image = calculateOutputImage(image, algorithm, default_pixel);
    default_pixel = default_pixel === "." ? "#" : ".";
    image = expandImage(output_image, default_pixel);
  }
  return image.reduce(
    (prev, curr) => prev + curr.filter((x) => x === "#").length,
    0
  );
};

const solve2 = (algorithm, input_image) => {
  const N_STEPS = 50;
  let default_pixel = ".";
  let image = expandImage(input_image, default_pixel);
  for (let i = 0; i < N_STEPS; i++) {
    const output_image = calculateOutputImage(image, algorithm, default_pixel);
    default_pixel = default_pixel === "." ? "#" : ".";
    image = expandImage(output_image, default_pixel);
  }
  return image.reduce(
    (prev, curr) => prev + curr.filter((x) => x === "#").length,
    0
  );
};

readFile("input.txt").then(([algorithm, input_image]) => {
  console.log(`solution to part 1: ${solve1(algorithm, input_image)}`);
  console.log(`solution to part 2: ${solve2(algorithm, input_image)}`);
});
