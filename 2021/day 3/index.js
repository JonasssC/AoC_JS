const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let count = new Array(lines[0].length).fill(0);

for(let line of lines) {
    for(let i = 0; i < line.length; i++) {
        if(line[i] === '1') count[i]++;
    }
}

let gammaBin = count.map(c => c > lines.length / 2 ? '1' : '0').join('');
let epsilonBin = count.map(c => c > lines.length / 2 ? '0' : '1').join('');

let gamma = parseInt(gammaBin, 2);
let epsilon = parseInt(epsilonBin, 2);

console.log("Part 1: ", gamma * epsilon);

// Part 2

let numbers = lines.slice();

for(let i = 0; i < count.length; i++) {
    count = new Array(lines[0].length).fill(0);

    for(let line of numbers) {
        for(let i = 0; i < line.length; i++) {
            if(line[i] === '1') count[i]++;
        }
    }

    gammaBin = count.map(c => c >= numbers.length / 2 ? '1' : '0').join('');

    numbers = numbers.filter(value => value[i] === gammaBin[i]);
}

let oxygenBin = numbers[0];

numbers = lines.slice();

for(let i = 0; i < count.length; i++) {
    count = new Array(lines[0].length).fill(0);

    for(let line of numbers) {
        for(let i = 0; i < line.length; i++) {
            if(line[i] === '1') count[i]++;
        }
    }
    console.log(count, i, numbers.length);
    epsilonBin = count.map(c => c >= numbers.length / 2 ? '0' : '1').join('');

    numbers = numbers.filter(value => value[i] === epsilonBin[i]);
    if(numbers.length === 1) break;
}

let co2Bin = numbers[0];
console.log(oxygenBin, co2Bin);

let oxygen = parseInt(oxygenBin, 2);
let co2 = parseInt(co2Bin, 2);

console.log("Part 2: ", oxygen * co2);
