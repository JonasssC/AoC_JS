const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim()
let octopi = input
    .split('\r\n')
    .map(l => l.split('').map(Number));

function doStep() {
    increaseEnergyLevels();
    let flashCount = flashOctopi();
    resetFlashedOctopi();
    return flashCount;
}

function increaseEnergyLevels() {
    for(let row in octopi)
        for(let col in octopi[row])
            octopi[row][col]++;
}

function flashOctopi() {
    let flashCount = 0;
    for(let i in octopi)
        for(let j in octopi[i])
            if(octopi[i][j] >= 10) flashCount = flash(flashCount, i, j);
    return flashCount;
}

function flash(flashCount, row, col) {
    row = Number(row);
    col = Number(col);
    flashCount++;
    octopi[row][col] = -100;
    for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++)
            if (!(i === 0 && j === 0) && isInBounds(row + i, col + j))
                if(++octopi[row + i][col+j] >= 10) flashCount = flash(flashCount, row + i, col + j);
    return flashCount;
}

function isInBounds(row, col) {
    return row >= 0 && row < 10
        && col >= 0 && col < 10;
}

function resetFlashedOctopi() {
    for(let row in octopi)
        for(let col in octopi[row])
            if(octopi[row][col] < 0) octopi[row][col] = 0;
}

let flashCountTotal = 0;
for(let i = 0; i < 100; i++) flashCountTotal += doStep();

console.log('Part 1:', flashCountTotal)

// Part 2
octopi = input
    .split('\r\n')
    .map(l => l.split('').map(Number));

let i;
for(i = 1; i > 0; i++)
    if(doStep() === 100)
        break;

console.log('Part 2:', i);
