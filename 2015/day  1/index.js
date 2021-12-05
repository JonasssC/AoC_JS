const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let up = (input.match(/\(/g) || []).length;
let down = (input.match(/\)/g) || []).length;

console.log('Part 1:', up - down);

// Part 2
let floor = 0;
let i = 0;
for(i in input) {
    floor += input[i] === '(' ? 1 : input[i] === ')' ? -1 : 0;
    if(floor === -1) break;
}

console.log('Part 2:', Number(i) + 1);
