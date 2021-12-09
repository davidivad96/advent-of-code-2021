const fs = require("fs")
const readline = require("readline")

let N = -1
let M = -1

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
  })
  const result = []
  for await (const line of rl) {
    result.push(line.split('').map(Number))
  }
  N = result.length
  M = result[0].length
  return result
}

const getAdjacents = (cave, i, j) => ({
  up: i > 0 ? cave[i - 1][j] : undefined,
  down: i < N - 1 ? cave[i + 1][j] : undefined,
  left: j > 0 ? cave[i][j - 1] : undefined,
  right: j < M - 1 ? cave[i][j + 1] : undefined
})

const solve1 = (input) => {
  let sum = 0
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const current = input[i][j]
      const {
        up = Number.MAX_VALUE,
        down = Number.MAX_VALUE,
        left = Number.MAX_VALUE,
        right = Number.MAX_VALUE,
      } = getAdjacents(input, i, j)
      if ((up > current) && (down > current) && (left > current) && (right > current)) {
        sum += (1 + current)
      }
    }
  }
  return sum
}

const solve2 = (input) => {
  return 2
}

readFile("input.txt").then(input => {
  console.log(`solution to part 1: ${solve1(input)}`)
  console.log(`solution to part 2: ${solve2(input)}`)
})
