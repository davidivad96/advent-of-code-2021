const fs = require("fs")
const readline = require("readline")

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
  })
  const result = []
  for await (const line of rl) {
    result.push(...line.split(',').map(Number))
  }
  return result
}

const solve1 = (input) => {
  let best_fuel = Number.MAX_VALUE
  const min_value = Math.min(...input)
  const max_value = Math.max(...input)
  for (let i = min_value; i < max_value; i++) {
    let accumulated_fuel = 0
    for (let j = 0; j < input.length; j++) {
      accumulated_fuel += Math.abs(i - input[j])
    }
    if (accumulated_fuel < best_fuel) {
      best_fuel = accumulated_fuel
    }
  }
  return best_fuel
}

const solve2 = (input) => {
  let best_fuel = Number.MAX_VALUE
  const min_value = Math.min(...input)
  const max_value = Math.max(...input)
  for (let i = min_value; i < max_value; i++) {
    let accumulated_fuel = 0
    for (let j = 0; j < input.length; j++) {
      const distance = Math.abs(i - input[j])
      accumulated_fuel += (distance * (distance + 1)) / 2
    }
    if (accumulated_fuel < best_fuel) {
      best_fuel = accumulated_fuel
    }
  }
  return best_fuel
}

readFile("input.txt").then(input => {
  console.log(`solution to part 1: ${solve1(input)}`)
  console.log(`solution to part 2: ${solve2(input)}`)
})
