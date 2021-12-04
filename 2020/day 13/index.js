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

id = undefined;
let refTime = 0;
let lastDepartures = busses.map(bus => -1);

for(i = 0; !validDepartures(); i++) {
    for(let j = 0; j < busses.length; j++) {
        if(busses[j] !== 'x' && (earliestDepart + i + j) % busses[j] === 0) {
            lastDepartures[j] = earliestDepart + i;
        }
    }
}

function validDepartures() {
    for(let i = 0; i < lastDepartures.length; i++) {
        // console.log(i);
        if (busses[i] !== 'x' && lastDepartures[i] - lastDepartures[0] !== i) return false;
    }

    return true;
}

console.log(`Part 2: ${refTime}`)
