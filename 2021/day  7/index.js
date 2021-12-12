const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim();

let crabs = input.split(',').map(Number);
let furthest = crabs.reduce((max, crab) => crab > max ? crab : max, crabs[0]);

let minFuel;

for(let i = 0; i < furthest; i++) {
    let fuel = 0;
    for(let crab of crabs) fuel += Math.abs(crab - i);
    if(!minFuel || fuel < minFuel) minFuel = fuel;
}

console.log('Part 1:', minFuel);

// Part 2
minFuel = undefined;

for(let i = 0; i < furthest; i++) {
    let fuel = 0;
    for(let crab of crabs)
        fuel += increasingSum(Math.abs(crab - i));
    if(!minFuel || fuel < minFuel) minFuel = fuel;
}

console.log('Part 2:', minFuel);

function increasingSum(num) {
    let res = 0;
    for(let i = 1; i <= num; i++) res += i;
    return res;
}
