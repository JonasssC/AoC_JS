const fs = require('fs');

let lines = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\r\n');

let illegalScore = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

let illegalCount = {
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0
};

let closingOpening = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};

lines.map(getCorruptingChar)
    .filter(c => c !== undefined)
    .forEach(c => illegalCount[c]++);

function getCorruptingChar(line) {
    let openingBrackets = [];
    for(let char of line) {
        if ('([{<'.includes(char)) {
            openingBrackets.unshift(char);
        } else if (openingBrackets.shift() !== closingOpening[char]) {
            return char;
        }
    }
}

console.log('Part 1:', Object.entries(illegalCount).reduce((res, c) => res + c[1] * illegalScore[c[0]], 0))

// Part 2
lines = lines.filter(l => !getCorruptingChar(l));

let finishingScore = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};

let openingClosing = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
};

let completionScores = lines.map(getCompletionScore).sort((a, b) => a - b);
console.log('Part 2:', completionScores[Math.round(completionScores.length / 2) - 1]);

function getCompletionScore(line) {
    let openingBrackets = [];
    for(let char of line) {
        if ('([{<'.includes(char)) {
            openingBrackets.unshift(char);
        } else {
            openingBrackets.shift();
        }
    }
    return openingBrackets
        .map(b => openingClosing[b])
        .reduce((res, b) => res * 5 + finishingScore[b], 0);
}
