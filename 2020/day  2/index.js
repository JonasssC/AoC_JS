const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let count = 0;
for(let line of lines) {
    let splitLine = line.split(' ');

    let min = Number(splitLine[0].split('-')[0]);
    let max = Number(splitLine[0].split('-')[1]);

    let letter = splitLine[1][0]

    let letterCount = 0;
    for(let char of splitLine[2])
        if(char === letter) letterCount++;

    if(letterCount >= min && letterCount <= max) count++;
}

console.log(`Part 1: ${count}`);

// Part 2

count = 0;

for(let line of lines) {
    let splitLine = line.split(' ');

    let pos1 = Number(splitLine[0].split('-')[0]);
    let pos2 = Number(splitLine[0].split('-')[1]);

    let letter = splitLine[1][0]

    if(xor(splitLine[2][pos1-1] === letter, splitLine[2][pos2-1] === letter)) count++;
}

console.log(`Part 2: ${count}`);

function xor(cond1, cond2) {
    return (cond1 || cond2) && !(cond1 && cond2);
}
