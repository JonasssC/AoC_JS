const fs = require('fs');

let fullStrings = fs.readFileSync('input.txt', 'utf8').split('\r\n').filter(l => l !== "");

let processedStrings = fullStrings.map(eval);

let fullLength = fullStrings.reduce((sum, string) => sum + string.length, 0);
let processedLength = processedStrings.reduce((sum, string) => sum + string.length, 0);

console.log('Part 1:', fullLength - processedLength);

// Part 2
let expandedStrings = fullStrings.map(line => '"' + line.split('').map(c => c === '"' ? '\\"' : c === '\\' ? '\\\\' : c).join('') + '"');

let expandedLength = expandedStrings.reduce((sum, string) => sum + string.length, 0);

console.log('Part 2:', expandedLength - fullLength);
