const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let pipes = parsePipes(lines);

let coords_hit = new Map();

for(let pipe of pipes.filter(pipe => pipe.from.x === pipe.to.x
                                  || pipe.from.y === pipe.to.y)) markPipe(pipe);

const multipleHitCount = () => [...coords_hit.values()].reduce((res, val) => val >= 2 ? res + 1 : res, 0);

console.log('Part 1:', multipleHitCount());

// Part 2
coords_hit.clear();
for(let pipe of pipes) markPipe(pipe);

console.log('Part 2:', multipleHitCount());

function parsePipes(lines) {
    return lines
        .map(l => l.split(' -> '))
        .map(sl => sl.map(c => c.split(',')))
        .map(coords => ({
            from: {
                x: Number(coords[0][0]),
                y: Number(coords[0][1])
            },
            to: {
                x: Number(coords[1][0]),
                y: Number(coords[1][1])
            }
        }));
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
