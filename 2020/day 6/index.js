const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n');

let count = 0;

let counted = [];

for(let line of lines) {
    if(line === "") counted = [];

    for(let char of line) {
        if(!counted.includes(char)) {
            counted.push(char);
            count++;
        }
    }
}

console.log(`Part 1: ${count}`);


// Part 2
let present = 'abcdefghijklmnopqrstuvwxyz'.split('');
count = 0;

for(let line of lines) {
    if(line === "") {
        count += present.length;
        present = 'abcdefghijklmnopqrstuvwxyz'.split('');
    } else {
        for (let char of present) {
            if (!line.includes(char)) {
                present = present.filter(ch => ch !== char);
            }
        }
    }
}

console.log(`Part 2: ${count}`);
