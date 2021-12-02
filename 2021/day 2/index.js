const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let instructions = input
    .split('\r\n')
    .filter(line => line !== "");

let pos = {x: 0, y: 0};

for(let instruction of instructions) followInstruction1(instruction);

function followInstruction1(instruction) {
    let splitInstruction = instruction.split(' ');
    switch(splitInstruction[0]) {
        case 'forward':
            pos.x += Number(splitInstruction[1]);
            break;
        case 'down':
            pos.y += Number(splitInstruction[1]);
            break
        case 'up':
            pos.y -= Number(splitInstruction[1]);
            break;
    }
}

console.log("Part 1: ", pos.x * pos.y);

// Part 2

pos = {x: 0, y: 0};
let aim = 0;

for(let instruction of instructions) followInstruction2(instruction);

function followInstruction2(instruction) {
    let splitInstruction = instruction.split(' ');
    switch(splitInstruction[0]) {
        case 'forward':
            pos.x += Number(splitInstruction[1]);
            pos.y += aim * Number(splitInstruction[1]);
            break;
        case 'down':
            aim += Number(splitInstruction[1]);
            break
        case 'up':
            aim -= Number(splitInstruction[1]);
            break;
    }
}

console.log("Part 2: ", pos.x * pos.y);
