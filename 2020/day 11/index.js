const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let layout = input
    .split('\r\n')
    .filter(line => line !== '')
    .map(line => line.split(''));

while(true) {
    let coords = applyConditions1();
    if(coords.length === 0) break;
    toggleCoords(coords);
}

console.log(`Part 1: ${countOccupied()}`);

function applyConditions1() {
    let coordsToBeEdited = [];

    for(let i = 0; i < layout.length; i++) {
        for(let j = 0; j < layout[i].length; j++) {
            if(layout[i][j] === '.') continue;

            let adjacentOccupied = countAdjacentOccupied(i, j);
            switch (layout[i][j]) {
                case 'L':
                    if(adjacentOccupied === 0)
                        coordsToBeEdited.push({row: i, col: j});
                    break;
                case '#':
                    if(adjacentOccupied >= 4)
                        coordsToBeEdited.push({row: i, col: j});
                    break;
            }
        }
    }

    return coordsToBeEdited;
}

function countAdjacentOccupied(row, col) {
    let count = 0;

    for(let i = row - 1; i <= row + 1; i++)
        for(let j = col - 1; j <= col + 1; j++)
            if(i >= 0
                && j >= 0
                && i < layout.length
                && j < layout[row].length
                && !(i === row && j === col)
                && layout[i][j] === '#') count ++;
    return count;
}

function toggleCoords(coords) {
    for(let coord of coords) {
        switch (layout[coord.row][coord.col]) {
            case '#':
                layout[coord.row][coord.col] = 'L';
                break;
            case 'L':
                layout[coord.row][coord.col] = '#';
                break;
        }
    }
}

function countOccupied() {
    let count = 0;
    for(let row of layout)
        for(let seat of row)
            if(seat === '#') count++;
    return count;
}


// Part 2

layout = input
    .split('\r\n')
    .filter(line => line !== '')
    .map(line => line.split(''));

while(true) {
    let coords = applyConditions2();
    if(coords.length === 0) break;
    toggleCoords(coords);
}

console.log(`Part 2: ${countOccupied()}`);

function applyConditions2() {
    let coordsToBeEdited = [];

    for(let i = 0; i < layout.length; i++) {
        for(let j = 0; j < layout[i].length; j++) {
            if(layout[i][j] === '.') continue;

            let visiblyOccupied = countVisiblyOccupied(i, j);
            switch (layout[i][j]) {
                case 'L':
                    if(visiblyOccupied === 0)
                        coordsToBeEdited.push({row: i, col: j});
                    break;
                case '#':
                    if(visiblyOccupied >= 5)
                        coordsToBeEdited.push({row: i, col: j});
                    break;
            }
        }
    }

    return coordsToBeEdited;
}

function isInBounds(row, col) {
    return row >= 0 && row < layout.length
        && col >= 0 && col < layout[row].length;
}

function countVisiblyOccupied(row, col) {
    let count = 0;
    for(let i = -1; i <= 1; i++)
        for(let j = -1; j <= 1; j++)
            if(j !== 0 || i !== 0)
                if(isVisiblyOccupiedInDirection(row, col, i, j)) count++;

    return count;
}

function isVisiblyOccupiedInDirection(row, col, dRow, dCol) {
    for(let i = 1; isInBounds(row + i * dRow, col + i * dCol); i++) {
        switch (layout[row + i * dRow][col + i * dCol]) {
            case '#': return true;
            case 'L': return false;
        }
    }

    return false;
}
