const fs = require("fs");
const readline = require("readline");

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const result = {};
  for await (const line of rl) {
    const node_1 = line.split("-")[0];
    const node_2 = line.split("-")[1];
    result[node_1] = result[node_1] ? [...result[node_1], node_2] : [node_2];
    result[node_2] = result[node_2] ? [...result[node_2], node_1] : [node_1];
  }
  return result;
};

const countPaths1 = (graph, start_node, end_node, count, visited_nodes) => {
  if (start_node === end_node) {
    return count + 1;
  }
  for (const node of graph[start_node]) {
    if (node === node.toUpperCase() || visited_nodes.indexOf(node) === -1) {
      count = countPaths1(graph, node, end_node, count, [
        ...visited_nodes,
        node,
      ]);
    }
  }
  return count;
};

const solve1 = (input) => {
  const num_paths = countPaths1(input, "start", "end", 0, ["start"]);
  return num_paths;
};

const countPaths2 = (
  graph,
  start_node,
  end_node,
  count,
  visited_nodes,
  small_cave_to_revisit
) => {
  if (start_node === end_node) {
    return count + 1;
  }
  for (const node of graph[start_node]) {
    if (
      node === node.toUpperCase() ||
      visited_nodes.indexOf(node) === -1 ||
      (node === small_cave_to_revisit &&
        visited_nodes.filter((n) => n === node).length < 2)
    ) {
      count = countPaths2(
        graph,
        node,
        end_node,
        count,
        [...visited_nodes, node],
        small_cave_to_revisit
      );
    }
  }
  return count;
};

const solve2 = (input) => {
  const num_paths_without_revisiting = countPaths1(input, "start", "end", 0, [
    "start",
  ]);
  const small_caves = Object.keys(input).filter(
    (cave) => cave === cave.toLowerCase() && cave !== "start" && cave !== "end"
  );
  const num_paths = small_caves.map((small_cave) =>
    countPaths2(input, "start", "end", 0, ["start"], small_cave)
  );
  return (
    num_paths_without_revisiting +
    num_paths.reduce(
      (prev, curr) => prev + (curr - num_paths_without_revisiting),
      0
    )
  );
};

readFile("input.txt").then((input) => {
  console.log(`solution to part 1: ${solve1(input)}`);
  console.log(`solution to part 2: ${solve2(input)}`);
});
