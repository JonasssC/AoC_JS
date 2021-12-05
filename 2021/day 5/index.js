const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let coords_hit = new Map();
let pipes = parsePipes(lines);

for(let pipe of pipes.filter(pipe => pipe.from.x === pipe.to.x
                                  || pipe.from.y === pipe.to.y)) markPipe(pipe);


let multipleHitCount = [...coords_hit.values()].reduce((res, val) => val >= 2 ? res + 1 : res, 0);

console.log('Part 1:', multipleHitCount);

// Part 2

coords_hit.clear();
for(let pipe of pipes) markPipe(pipe);

multipleHitCount = [...coords_hit.values()].reduce((res, val) => val >= 2 ? res + 1 : res, 0);

console.log('Part 2:', multipleHitCount);

function parsePipes(lines) {
    let pipes = [];
    for(let line of lines) {
        let splitLine = line.split(' -> ');
        pipes.push({
            from: {
                x: Number(splitLine[0].split(',')[0]),
                y: Number(splitLine[0].split(',')[1])
            },
            to: {
                x: Number(splitLine[1].split(',')[0]),
                y: Number(splitLine[1].split(',')[1])
            }
        });
    }
    return pipes;
}

function markPipe(pipe) {
    let step = {
        x: pipe.from.x === pipe.to.x ? 0 : (pipe.from.x < pipe.to.x ? 1 : -1),
        y: pipe.from.y === pipe.to.y ? 0 : (pipe.from.y < pipe.to.y ? 1 : -1)
    };

    for(let i = 0; pipe.from.x + i * step.x !== pipe.to.x + step.x
                || pipe.from.y + i * step.y !== pipe.to.y + step.y; i++) {
        let coordKey = `${pipe.from.x + i * step.x},${pipe.from.y + i * step.y}`;
        coords_hit.set(coordKey, 1 + (coords_hit.has(coordKey) ? coords_hit.get(coordKey) : 0));
    }
}
