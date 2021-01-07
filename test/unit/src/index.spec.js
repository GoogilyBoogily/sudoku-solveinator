'use strict';

let test = require('tape');

test('Is an invalid puzzle', (t) => {
  t.plan(1);

  let solver = require('../../../src/index');

  let actualError;
  const expectedErrorMessage = 'Puzzle has invalid length.';

  try {
    solver.solve('I AM DEFINITELY NOT A VALID PUZZLE');
  } catch (error) {
    actualError = error;
  }

  t.equal(actualError.message, expectedErrorMessage);
});

test('Is a valid puzzle without a solution', (t) => {
  t.plan(1);

  let solver = require('../../../src/index');

  let actualError;
  const expectedErrorMessage = 'No solution found.';

  try {
    solver.solve('171700509573024106800501002700295018009400305652800007465080071000159004908007053');
  } catch (error) {
    actualError = error;
  }

  t.equal(actualError.message, expectedErrorMessage);
});

test('Is a valid puzzle with a solution, and returns a formatted puzzle', (t) => {
  t.plan(1);

  let solver = require('../../../src/index');

  let result = solver.solve('001700509573024106800501002700295018009400305652800007465080071000159004908007053');

  t.same(result,
    '2 | 4 | 1 | 7 | 6 | 8 | 5 | 3 | 9\n------------------------------------\n5 | 7 | 3 | 9 | 2 | 4 | 1 | 8 | 6\n------------------------------------\n8 | 9 | 6 | 5 | 3 | 1 | 7 | 4 | 2\n------------------------------------\n7 | 3 | 4 | 2 | 9 | 5 | 6 | 1 | 8\n------------------------------------\n1 | 8 | 9 | 4 | 7 | 6 | 3 | 2 | 5\n------------------------------------\n6 | 5 | 2 | 8 | 1 | 3 | 4 | 9 | 7\n------------------------------------\n4 | 6 | 5 | 3 | 8 | 2 | 9 | 7 | 1\n------------------------------------\n3 | 2 | 7 | 1 | 5 | 9 | 8 | 6 | 4\n------------------------------------\n9 | 1 | 8 | 6 | 4 | 7 | 2 | 5 | 3\n------------------------------------\n');
});

test('Is a valid puzzle with a solution', (t) => {
  t.plan(1);

  let solver = require('../../../src/index');

  let result = solver.solve('001700509573024106800501002700295018009400305652800007465080071000159004908007053', false);

  t.same(result, [
    [2, 4, 1, 7, 6, 8, 5, 3, 9],
    [5, 7, 3, 9, 2, 4, 1, 8, 6],
    [8, 9, 6, 5, 3, 1, 7, 4, 2],
    [7, 3, 4, 2, 9, 5, 6, 1, 8],
    [1, 8, 9, 4, 7, 6, 3, 2, 5],
    [6, 5, 2, 8, 1, 3, 4, 9, 7],
    [4, 6, 5, 3, 8, 2, 9, 7, 1],
    [3, 2, 7, 1, 5, 9, 8, 6, 4],
    [9, 1, 8, 6, 4, 7, 2, 5, 3]
  ]);
});
