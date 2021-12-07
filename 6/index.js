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

const calculateNewFishes = (fishes, start_days, end_day, accumulated_sum) => {
  if (fishes.length === 0) {
    return accumulated_sum
  }
  const new_fishes = []
  const new_start_days = []
  let sum = 0
  for (let i = 0; i < fishes.length; i++) {
    let current_fish = fishes[i]
    for (let j = start_days[i]; j < end_day; j++) {
      if (current_fish === 0) {
        current_fish = 6
        new_fishes.push(8)
        new_start_days.push(j + 1)
        sum++
      } else {
        current_fish--
      }
    }
  }
  return calculateNewFishes(new_fishes, new_start_days, end_day, sum + accumulated_sum)
}

const solve1 = (input) => {
  const N = 80
  return input.length + calculateNewFishes(input, Array.from({ length: input.length }, () => 0), N, 0)
}

const solve2 = (input) => {
  const N = 256
  const circular_buffer = Array.from({ length: 9 }, (_, i) => input.filter(val => val === i).length)
  for (let i = 0; i < N; i++) {
    const zeroes = circular_buffer[0]
    for (let j = 1; j < circular_buffer.length; j++) {
      circular_buffer[j - 1] = circular_buffer[j]
    }
    circular_buffer[circular_buffer.length - 1] = zeroes
    circular_buffer[6] += zeroes
  }
  return circular_buffer.reduce((prev, curr) => prev + curr, 0)
}

readFile("input.txt").then(input => {
  console.log(`solution to part 1: ${solve1(input)}`)
  console.log(`solution to part 2: ${solve2(input)}`)
})
