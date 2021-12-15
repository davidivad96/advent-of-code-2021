const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = [];
  for await (const line of rl) {
    result.push(line.split("").map(Number));
  }
  return result;
};

const findMinDistance = (distances, shortest_path, N) => {
  let min = Number.MAX_VALUE;
  let min_index_i = -1;
  let min_index_j = -1;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const distance = distances[i][j];
      if (!shortest_path[i][j] && distance < min) {
        min = distance;
        min_index_i = i;
        min_index_j = j;
      }
    }
  }
  return [min_index_i, min_index_j];
};

const dijkstra = (graph) => {
  const N = graph.length;
  const distances = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Number.MAX_VALUE)
  );
  distances[0][0] = 0;
  const shortest_path = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  while (!shortest_path[N - 1][N - 1]) {
    const [i, j] = findMinDistance(distances, shortest_path, N);
    shortest_path[i][j] = true;
    if (j < N - 1 && !shortest_path[i][j + 1]) {
      distances[i][j + 1] = Math.min(
        distances[i][j + 1],
        distances[i][j] + graph[i][j + 1]
      );
    }
    if (j > 0 && !shortest_path[i][j - 1]) {
      distances[i][j - 1] = Math.min(
        distances[i][j - 1],
        distances[i][j] + graph[i][j - 1]
      );
    }
    if (i < N - 1 && !shortest_path[i + 1][j]) {
      distances[i + 1][j] = Math.min(
        distances[i + 1][j],
        distances[i][j] + graph[i + 1][j]
      );
    }
    if (i > 0 && !shortest_path[i - 1][j]) {
      distances[i - 1][j] = Math.min(
        distances[i - 1][j],
        distances[i][j] + graph[i - 1][j]
      );
    }
  }
  return distances[N - 1][N - 1];
};

const solve1 = (input) => dijkstra(input);

const copyArray = (arr) =>
  Array.from({ length: arr.length }, (_, i) =>
    Array.from({ length: arr[0].length }, (_, j) => arr[i][j])
  );

const buildFullMap = (tile) => {
  const N = tile.length;
  const result = copyArray(tile);
  // build rows first
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < 4; j++) {
      result[i] = [
        ...result[i],
        ...tile[i].map((x) => {
          const sum = x + j + 1;
          return sum >= 10 ? (sum % 10) + 1 : sum;
        }),
      ];
    }
  }
  // build columns later
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < N; j++) {
      result.push(
        result[j].map((x) => {
          const sum = x + i + 1;
          return sum >= 10 ? (sum % 10) + 1 : sum;
        })
      );
    }
  }
  return result;
};

const solve2 = (input) => {
  const map = buildFullMap(input);
  return dijkstra(map);
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
