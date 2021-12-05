const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let pos = {x: 0, y: 0};
let hitCoords = new Map();
hitCoords.set('0,0', 1);

for(let char of input) {
    switch(char) {
        case '>':
            pos.x++;
            break;
        case '<':
            pos.x--;
            break;
        case 'v':
            pos.y--;
            break;
        case '^':
            pos.y++;
            break;
        default:
            continue;
    }
    let coordKey = `${pos.x},${pos.y}`;
    hitCoords.set(coordKey, hitCoords.has(coordKey) ? hitCoords.get(coordKey) + 1 : 1);
}

console.log('Part 1:', hitCoords.size + 1);

// Part 2

let posses = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

hitCoords.clear();
hitCoords.set('0,0', 1);

let mover = 0;
const nextMover = () => mover = ++mover >= posses.length ? 0 : mover;

for(let char of input) {
    switch(char) {
        case '>':
            posses[mover].x++;
            break;
        case '<':
            posses[mover].x--;
            break;
        case 'v':
            posses[mover].y--;
            break;
        case '^':
            posses[mover].y++;
            break;
        default:
            continue;
    }
    let coordKey = `${posses[mover].x},${posses[mover].y}`;
    hitCoords.set(coordKey, hitCoords.has(coordKey) ? hitCoords.get(coordKey) + 1 : 1);
    nextMover();
}

console.log('Part 2:', hitCoords.size);
