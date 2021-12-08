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

const numberOfCharactersIncluded = (string, characters) => {
  let sum = 0
  for (const character of characters) {
    if (string.includes(character)) {
      sum++
    }
  }
  return sum
}

const calculateNumbers = (pattern) => {
  let pattern_copy = [...pattern]
  const one = pattern_copy.find(segments => segments.length === 2)
  pattern_copy.splice(pattern_copy.indexOf(one), 1)
  const four = pattern_copy.find(segments => segments.length === 4)
  pattern_copy.splice(pattern_copy.indexOf(four), 1)
  const seven = pattern_copy.find(segments => segments.length === 3)
  pattern_copy.splice(pattern_copy.indexOf(seven), 1)
  const eight = pattern_copy.find(segments => segments.length === 7)
  pattern_copy.splice(pattern_copy.indexOf(eight), 1)
  const nine = pattern_copy.find(segments => segments.length === 6 && numberOfCharactersIncluded(segments, four) === 4)
  pattern_copy.splice(pattern_copy.indexOf(nine), 1)
  const zero = pattern_copy.find(segments => segments.length === 6 && numberOfCharactersIncluded(segments, one) === 2)
  pattern_copy.splice(pattern_copy.indexOf(zero), 1)
  const six = pattern_copy.find(segments => segments.length === 6)
  pattern_copy.splice(pattern_copy.indexOf(six), 1)
  const three = pattern_copy.find(segments => segments.length === 5 && numberOfCharactersIncluded(segments, one) === 2)
  pattern_copy.splice(pattern_copy.indexOf(three), 1)
  const five = pattern_copy.find(segments => segments.length === 5 && numberOfCharactersIncluded(segments, four) === 3)
  pattern_copy.splice(pattern_copy.indexOf(five), 1)
  const two = pattern_copy[0]
  pattern_copy.splice(pattern_copy.indexOf(two), 1)
  return [zero, one, two, three, four, five, six, seven, eight, nine]
}

const decodeOutput = (numbers, output) => {
  let number = ''
  for (const digit of output) {
    number = number.concat(
      numbers.findIndex(
        n => n.length === digit.length && numberOfCharactersIncluded(n, digit) === digit.length
      )
    )
  }
  return Number(number)
}

const solve2 = (patterns, outputs) => {
  let sum = 0
  for (let i = 0; i < patterns.length; i++) {
    const numbers = calculateNumbers(patterns[i])
    sum += decodeOutput(numbers, outputs[i])
  }
  return sum
}

readFile("input.txt").then(([patterns, outputs]) => {
  console.log(`solution to part 1: ${solve1(patterns, outputs)}`)
  console.log(`solution to part 2: ${solve2(patterns, outputs)}`)
})
