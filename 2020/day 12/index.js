const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let instructions = input
    .split('\r\n')
    .filter(line => line !== '');

let pos = {x: 0, y: 0};
let dir = {x: 1, y: 0};

for(let instruction of instructions) followInstruction1(instruction);

let manhDist = Math.abs(pos.x) + Math.abs(pos.y);
console.log(`Part 1: ${manhDist}`);

function followInstruction1(instruction) {
    let value = Number(instruction.slice(1));

    switch(instruction[0]) {
        case 'N':
            step({x: 0, y: 1}, value);
            break;
        case 'S':
            step({x: 0, y: -1}, value);
            break;
        case 'E':
            step({x: 1, y: 0}, value);
            break;
        case 'W':
            step({x: -1, y: 0}, value);
            break;
        case 'L':
            for(let i = 0; i < value; i += 90)
                dir = {x: -dir.y, y: dir.x};
            break;
        case 'R':
            for(let i = 0; i < value; i += 90)
                dir = {x: dir.y, y: -dir.x};
            break;
        case 'F':
            step(dir, value);
            break;
    }
}

function step(direction, amount) {
    pos.x += direction.x * amount;
    pos.y += direction.y * amount;
}

// Part 2

pos = {x: 0, y: 0};
let waypoint = {x: 10, y: 1};

for(let instruction of instructions) followInstruction2(instruction);

manhDist = Math.abs(pos.x) + Math.abs(pos.y);
console.log(`Part 2: ${manhDist}`);

function followInstruction2(instruction) {
    let value = Number(instruction.slice(1));

    switch(instruction[0]) {
        case 'N':
            waypoint.y += value;
            break;
        case 'S':
            waypoint.y -= value;
            break;
        case 'E':
            waypoint.x += value;
            break;
        case 'W':
            waypoint.x -= value;
            break;
        case 'L':
            for(let i = 0; i < value; i += 90)
                waypoint = {x: -waypoint.y, y: waypoint.x};
            break;
        case 'R':
            for(let i = 0; i < value; i += 90)
                waypoint = {x: waypoint.y, y: -waypoint.x};
            break;
        case 'F':
            step(waypoint, value);
            break;
    }
}
