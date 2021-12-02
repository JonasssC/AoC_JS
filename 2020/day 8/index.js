const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let instructions = input
    .split('\r\n')
    .filter(line => line !== "");

let result = run(instructions);

console.log(`Part 1: ${result.acc}`);

// Part 2
for(let i = 0; i < instructions.length; i++) {
    let instructionsCopy = instructions.slice();
    if(instructionsCopy[i].includes('nop'))
        instructionsCopy[i] = instructionsCopy[i].replace('nop', 'jmp');
    else if(instructionsCopy[i].includes('jmp'))
        instructionsCopy[i] = instructionsCopy[i].replace('jmp', 'nop');
    else continue;

    result = run(instructionsCopy);
    if(result.finished) break;
}

if(result.finished) {
    console.log(`Part 2: ${result.acc}`);
} else {
    console.log(`Part 2: Not found`);
}

function run(instructions) {
    let acc = 0;
    let passedInstructions = [];
    let finished = true;

    for(let i = 0; i < instructions.length; i++) {
        let splitInstruction = instructions[i].split(" ");
        if(passedInstructions.includes(i)) {
            finished = false;
            break;
        }
        passedInstructions.push(i);

        switch (splitInstruction[0]) {
            case "nop":
                break;
            case "acc":
                acc += Number(splitInstruction[1]);
                break;
            case "jmp":
                i += Number(splitInstruction[1]) - 1;
                break;
        }
    }

    return { finished: finished, acc: acc };
}
