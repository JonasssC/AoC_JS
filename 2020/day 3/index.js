const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let count = 0;
let row = 0;
let col = 0;

while(row < lines.length) {
    if(lines[row][col] === '#') count++;

    row += 1;
    col += 3;
    col %= lines[0].length;
}

console.log(`Part 1: ${count}`);

// Part 2

let slopes = [{right: 1, down: 1, count: 0},
              {right: 3, down: 1, count: 0},
              {right: 5, down: 1, count: 0},
              {right: 7, down: 1, count: 0},
              {right: 1, down: 2, count: 0}];

for(let slope of slopes) {
    row = 0;
    col = 0;

    while(row < lines.length) {
        if(lines[row][col] === '#') slope.count++;

        row += slope.down;
        col += slope.right;
        col %= lines[0].length;
    }
}

console.log(`Part 2: ${slopes.reduce((count, slope) => count *= slope.count, 1)}`);
