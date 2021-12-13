const fs = require('fs');

let instructions = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\r\n')
    .map(instr => instr.split(' -> '))
    .map(parseInstruction);

function parseInstruction(instr) {
    if(instr[0].includes('AND')) {
        return {
            action: 'AND',
            dest: instr[1],
            vars: [instr[0].split(' AND ')[0], instr[0].split(' AND ')[1]]
        }
    } else if(instr[0].includes('OR')) {
        return {
            action: 'OR',
            dest: instr[1],
            vars: instr[0].split(' OR ')
        }
    } else if(instr[0].includes('NOT')) {
        return {
            action: 'NOT',
            dest: instr[1],
            vars: [instr[0].replace('NOT ', '')]
        }
    } else if(instr[0].includes('LSHIFT')) {
        return {
            action: 'LSHIFT',
            dest: instr[1],
            vars: [instr[0].split(' LSHIFT ')[0]],
            amount: Number(instr[0].split(' LSHIFT ')[1])
        }
    } else if(instr[0].includes('RSHIFT')) {
        return {
            action: 'RSHIFT',
            dest: instr[1],
            vars: [instr[0].split(' RSHIFT ')[0]],
            amount: Number(instr[0].split(' RSHIFT ')[1])
        }
    } else {
        return {
            action: 'PUT',
            dest: instr[1],
            vars: [instr[0]]
        }
    }
}

let wires = new Map();

runInstructions();

console.log('Part 1:', wires.get('a'));

function getExecutableInstructions(instructions) {
    return instructions.filter(i => !i.vars.find(v => getVarValue(v) === undefined));
}

function getVarValue(v) {
    if(/^\d+$/.test(v)) return Number(v);
    return wires.get(v);
}

function runInstructions() {
    let leftOverInstructions = instructions.slice();
    while(leftOverInstructions.length > 0) {
        let executableInstructions = getExecutableInstructions(leftOverInstructions);
        for(let instruction of executableInstructions) runInstruction(instruction);
        leftOverInstructions = leftOverInstructions.filter(i => !executableInstructions.includes(i));
    }
}

function runInstruction(instruction) {
    switch (instruction.action) {
        case 'PUT':
            wires.set(instruction.dest, getVarValue(instruction.vars[0]));
            break;
        case 'NOT':
            wires.set(instruction.dest, -1 * getVarValue(instruction.vars[0]) - 1);
            break;
        case 'AND':
            wires.set(instruction.dest, getVarValue(instruction.vars[0]) & getVarValue(instruction.vars[1]));
            break;
        case 'OR':
            wires.set(instruction.dest, getVarValue(instruction.vars[0]) | getVarValue(instruction.vars[1]));
            break;
        case 'RSHIFT':
            wires.set(instruction.dest, getVarValue(instruction.vars[0]) >> instruction.amount);
            break;
        case 'LSHIFT':
            wires.set(instruction.dest, getVarValue(instruction.vars[0]) << instruction.amount);
            break;
    }
}

// Part 2
instructions.find(inst => inst.dest === 'b').vars[0] = wires.get('a');

wires.clear();
runInstructions();

console.log('Part 2:', wires.get('a'));
