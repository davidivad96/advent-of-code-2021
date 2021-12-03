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

const mostCommonBitAtIndex = (input, i) => {
  const count_one = input.reduce((prev, curr) => curr.charAt(i) === "1" ? prev + 1 : prev, 0)
  return count_one >= input.length - count_one ? "1" : "0"
}

const solve1 = (input) => {
  let gamma_rate = ""
  let epsilon_rate = ""
  for (let i = 0; i < input[0].length; i++) {
    const most_common = mostCommonBitAtIndex(input, i)
    const least_common = most_common === "0" ? "1" : "0"
    gamma_rate = gamma_rate.concat(most_common)
    epsilon_rate = epsilon_rate.concat(least_common)
  }
  return parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2)
}

const solve2 = (input) => {
  let i = 0
  const calculateRatings = (oxygen_report, co2_report, index) => {
    if (oxygen_report.length === 1 && co2_report.length === 1) {
      return [oxygen_report[0], co2_report[0]]
    }
    let new_oxygen_report = [...oxygen_report]
    let new_co2_report = [...co2_report]
    if (oxygen_report.length > 1) {
      const oxygen_most_common = mostCommonBitAtIndex(oxygen_report, index)
      new_oxygen_report = oxygen_report.filter(value => value.charAt(index) === oxygen_most_common)
    }
    if (co2_report.length > 1) {
      const co2_most_common = mostCommonBitAtIndex(co2_report, index)
      const co2_least_common = co2_most_common === "0" ? "1" : "0"
      new_co2_report = co2_report.filter(value => value.charAt(index) === co2_least_common)
    }
    index++
    return calculateRatings(new_oxygen_report, new_co2_report, index)
  }
  const [oxygen_generator_rating, co2_scrubber_rating] = calculateRatings(input, input, i)
  return parseInt(oxygen_generator_rating, 2) * parseInt(co2_scrubber_rating, 2)
}

readFile("input.txt").then(input => {
  console.log(`solution to part 1: ${solve1(input)}`)
  console.log(`solution to part 2: ${solve2(input)}`)
})
