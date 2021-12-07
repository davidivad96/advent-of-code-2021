const fs = require("fs")
const readline = require("readline")

const readFile = async (path) => {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
  })
  const lines = []
  let first_line = true
  for await (const line of rl) {
    if (first_line) {
      lines.push(line.split(',').map(Number))
      first_line = false
    } else if (line !== '') {
      lines.push(line.split(' ').filter(val => val !== '').map(Number))
    }
  }
  const boards = []
  for (let i = 1; i < lines.length; i += 5) {
    boards.push(lines.slice(i, i + 5))
  }
  return [lines[0], boards]
}

const transpose2DArray = (arr) => arr[0].map((x, i) => arr.map(x => x[i]))

const getWinnerRow = (board) => board.find(row => row.every(number => number !== '.'))
const getWinnerColumn = (board) => getWinnerRow(transpose2DArray(board))

const isWinnerBoard = (board) => Boolean(getWinnerRow(board) || getWinnerColumn(board))

const solve1 = (numbers, boards) => {
  const marked = Array.from(boards, (board) => Array.from(board, (row) => Array.from(row, () => '.')))
  let win = false
  let winner_number = -1
  let unmarked_numbers_sum = 0
  let current_index = 0
  while (!win) {
    const current_number = numbers[current_index]
    boards.forEach((board, i) => {
      board.forEach((row, j) => {
        marked[i][j] = row.map((number, index) => number === current_number ? number : marked[i][j][index])
      })
      if (isWinnerBoard(marked[i])) {
        win = true
        winner_number = current_number
        const marked_flat = marked[i].flat()
        board.flat().forEach((number, j) => {
          if (marked_flat[j] === '.') {
            unmarked_numbers_sum += number
          }
        })
      }
    })
    current_index++
  }
  return unmarked_numbers_sum * winner_number
}

const solve2 = (numbers, boards) => {
  const marked = Array.from(boards, (board) => Array.from(board, (row) => Array.from(row, () => '.')))
  let winner_number = -1
  let unmarked_numbers_sum = 0
  let current_index = 0
  const winner_boards = []
  while (current_index < numbers.length) {
    const current_number = numbers[current_index]
    boards.forEach((board, i) => {
      board.forEach((row, j) => {
        marked[i][j] = row.map((number, index) => number === current_number ? number : marked[i][j][index])
      })
      if (isWinnerBoard(marked[i]) && !winner_boards.includes(i)) {
        winner_boards.push(i)
        winner_number = current_number
        unmarked_numbers_sum = 0
        const marked_flat = marked[i].flat()
        board.flat().forEach((number, j) => {
          if (marked_flat[j] === '.') {
            unmarked_numbers_sum += number
          }
        })
      }
    })
    current_index++
  }
  return unmarked_numbers_sum * winner_number
}

readFile("input.txt").then(([numbers, boards]) => {
  console.log(`solution to part 1: ${solve1(numbers, boards)}`)
  console.log(`solution to part 2: ${solve2(numbers, boards)}`)
})
