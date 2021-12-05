const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let schedule = input
    .split('\r\n')
    .filter(line => line !== '');

let earliestDepart = Number(schedule[0]);
let busses = schedule[1]
    .split(',');

let i;
let id;

for(i = 0; !id; i++) {
    for(let bus of busses.filter(bus => bus !== 'x')) {
        if((earliestDepart + i) % bus === 0) {
            id = bus;
            break;
        }
    }
}

console.log(`Part 1: ${id * --i}`)

// Part 2

// IDK?
