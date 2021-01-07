'use strict';

function SudokuSolver() {
  /*
   * Check if the number is a legal candidate
   * for the given cell (by Sudoku rules).
   */
  function checkCandidate(puzzleArray, currentNumber, row, column) {
    let validCandidate = true;

    for (let i = 0; i < 9; i++) {
      let bIndex =
        ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) *
        9 +
        (Math.floor(column / 3) * 3) +
        (i % 3);

      if (currentNumber == puzzleArray[(row * 9) + i] ||
        currentNumber == puzzleArray[column + (i * 9)] ||
        currentNumber == puzzleArray[bIndex]
      ) {
        validCandidate = false;

        break;
      }
    }

    return validCandidate;
  }

  /*
   * Recursively test all possible numbers for a given cell until
   * the puzzle is solved.
   */
  function getCandidate(index, puzzleArray) {
    if (index >= puzzleArray.length) {
      return true;
    } else if (puzzleArray[index] != 0) {
      return getCandidate(index + 1, puzzleArray);
    }

    for (let i = 1; i <= 9; i++) {
      const currentNumber = i;
      const row = Math.floor(index / 9);
      const column = index % 9;

      if (checkCandidate(puzzleArray, i, row, column)) {
        puzzleArray[index] = i;

        if (getCandidate(index + 1, puzzleArray)) {
          return true;
        }
      }
    }

    puzzleArray[index] = 0;

    return false;
  }

  function chunkIntoGroups(puzzleArray) {
    let result = [];

    const groupAmount = 9;

    for (let i = 0; i < puzzleArray.length; i += groupAmount) {
      result.push(puzzleArray.slice(i, i + groupAmount));
    }

    return result;
  }

  function validatePuzzleInput(puzzle) {
    if (puzzle.length !== 81) {
      throw new Error('Puzzle has invalid length.');
    }

    for (let i = 0; i < puzzle.length; i++) {
      if (isNaN(puzzle[i])) {
        throw new Error('Invalid puzzle', `In position ${i}: ${puzzle[i]}`);
      }
    }
  }

  function formatPuzzle(solution) {
    const chunked = chunkIntoGroups(solution);
    let formattedPuzzle = '';

    for (let i = 0; i < chunked.length; i++) {
      formattedPuzzle += `${chunked[i].join(' | ')}\n`;
      formattedPuzzle += `${'-'.repeat(chunked[i].length * 4)}\n`;
    }

    return formattedPuzzle;
  }

  this.solve = function (puzzle, formatResults = true) {
    validatePuzzleInput(puzzle);

    const puzzleArray = puzzle.split('').map((v) => parseInt(v));

    // Start solving on index 0;
    const solution = getCandidate(0, puzzleArray);

    if (!solution) {
      throw new Error('No solution found.')
    }

    return formatResults ? formatPuzzle(puzzleArray) : chunkIntoGroups(puzzleArray);
  }
}

const solver = new SudokuSolver();

const result = solver.solve('001700509573024106800501002700295018009400305652800007465080071000159004908007053');

module.exports = SudokuSolver;
