const fs = require("fs")
const readline = require("readline")

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
  })
  const result = []
  for await (const line of rl) {
    result.push(line)
  }
  return result
}

const solve1 = (input) => {
  let horizontal = 0
  let depth = 0
  input.forEach(command => {
    const action = command.split(" ")[0]
    const value = parseInt(command.split(" ")[1])
    if (action === "forward") {
      horizontal += value
    } else {
      depth += (action === "down" ? value : -value)
    }
  })
  return horizontal * depth
}

const solve2 = (input) => {
  let horizontal = 0
  let depth = 0
  let aim = 0
  input.forEach(command => {
    const action = command.split(" ")[0]
    const value = parseInt(command.split(" ")[1])
    if (action === "forward") {
      horizontal += value
      depth += aim * value
    } else {
      aim += (action === "down" ? value : -value)
    }
  })
  return horizontal * depth
}

readFile("input.txt").then(input => {
  console.log(`solution to part 1: ${solve1(input)}`)
  console.log(`solution to part 2: ${solve2(input)}`)
})
