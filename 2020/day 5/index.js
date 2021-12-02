const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let highest = 0;

for(let line of lines) {
    let id = getId(line);
    if(id > highest) highest = id;
}

function getId(line) {
    let rows = Array.from({length:128},(v,k)=>k);
    let cols = Array.from({length:8},(v,k)=>k);

    for(let char of line) {
        switch(char) {
            case 'F':
                rows = rows.slice(0, rows.length/2);
                break;
            case 'B':
                rows = rows.slice(rows.length/2, rows.length);
                break;
            case 'L':
                cols = cols.slice(0, cols.length/2);
                break;
            case 'R':
                cols = cols.slice(cols.length/2, cols.length);
                break;
        }
    }

    return rows[0] * 8 + cols[0];
}

console.log(`Part 1: ${highest}`);

// Part 2

let ids = lines.map(line => getId(line));
let seat;

for(let id of ids) {
    if(ids.includes(id - 2) && !ids.includes(id - 1)) {
        seat = id - 1;
        break;
    } else if(ids.includes(id + 2) && !ids.includes(id + 1)) {
        seat = id + 1;
        break;
    }
}

console.log(`Part 2: ${seat}`);
