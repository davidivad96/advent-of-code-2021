const fs = require("fs")
const readline = require("readline")

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
  })
  const patterns = []
  const outputs = []
  for await (const line of rl) {
    patterns.push(line.split(' | ')[0].split(' '))
    outputs.push(line.split(' | ')[1].split(' '))
  }
  return [patterns, outputs]
}

const solve1 = (patterns, outputs) => {
  return outputs.reduce((prev, curr) => {
    const unique_digits = curr.filter(digit => [2,3,4,7].includes(digit.length))
    return prev + unique_digits.length
  }, 0)
}

const solve2 = (patterns, outputs) => {
  return 2
}

readFile("input.txt").then(([patterns, outputs]) => {
  console.log(`solution to part 1: ${solve1(patterns, outputs)}`)
  console.log(`solution to part 2: ${solve2(patterns, outputs)}`)
})
