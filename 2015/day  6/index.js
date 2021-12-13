const fs = require('fs');

let instructions = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\r\n')
    .map(instr => instr.replace('turn ', '').split(' '))
    .map(instr => ({
        action: instr[0],
        from: {
            x: Number(instr[1].split(',')[0]),
            y: Number(instr[1].split(',')[1])
        },
        to: {
            x: Number(instr[3].split(',')[0]),
            y: Number(instr[3].split(',')[1])
        }
    }));


let grid = new Array(1000).fill(new Array(1000).fill(false)).map(row => row.slice());
for(let instruction of instructions) doInstruction1(instruction);

console.log('Part 1:', grid.flat().filter(l => l).length);

function doInstruction1(instr) {
    for(let i = instr.from.x; i <= instr.to.x; i++) {
        for(let j = instr.from.y; j <= instr.to.y; j++) {
            switch (instr.action) {
                case 'on':
                    grid[j][i] = true;
                    break;
                case 'off':
                    grid[j][i] = false;
                    break;
                case 'toggle':
                    grid[j][i] = !grid[j][i];
                    break;
            }
        }
    }
}

grid = new Array(1000).fill(new Array(1000).fill(0)).map(row => row.slice());
for(let instruction of instructions) doInstruction2(instruction);

console.log('Part 2:', grid.flat().reduce((sum, val) => sum + val, 0));

function doInstruction2(instr) {
    for(let i = instr.from.x; i <= instr.to.x; i++) {
        for(let j = instr.from.y; j <= instr.to.y; j++) {
            switch (instr.action) {
                case 'on':
                    grid[j][i]++;
                    break;
                case 'off':
                    if(--grid[j][i] < 0) grid[j][i] = 0;
                    break;
                case 'toggle':
                    grid[j][i] += 2;
                    break;
            }
        }
    }
}
