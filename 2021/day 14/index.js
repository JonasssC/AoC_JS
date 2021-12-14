const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\r\n\r\n');

let polymer = input[0];

let insertionRules = input[1]
    .split('\r\n')
    .map(l => l.split(' '))
    .map(f => ({ pair: f[0], insertion: f[2] }));

for(let _ = 0; _ < 10; _++) polymer = doPairInsertion(polymer);

let charOccurences = polymer.split('')
    .reduce((resMap, chr) => resMap.set(chr, (resMap.get(chr) || 0) + 1), new Map());

charOccurences = [...charOccurences.entries()].sort((a, b) => a[1] - b[1]);

console.log('Part 1:', charOccurences[charOccurences.length - 1][1] - charOccurences[0][1]);

function doPairInsertion(polymer) {
    let expandedPolymer = polymer[0];
    for(let i = 1; i < polymer.length; i++) {
        let rule = insertionRules.find(r => polymer.slice(i-1, i+1) === r.pair);
        expandedPolymer += `${rule.insertion}${polymer[i]}`;
    }
    return expandedPolymer;
}

// Part 2
polymer = input[0];

let polymerPairs = new Array(polymer.length - 1).fill(0)
    .map((_, i) => polymer.slice(i, i + 2))
    .reduce((resMap, val) => resMap.set(val, (resMap.get(val) || 0) + 1), new Map());
let finalChar = polymer.slice(polymer.length - 1);

for(let _ = 0; _ < 40; _++) polymerPairs = doGroupedPairInsertion(polymerPairs);

charOccurences = [...polymerPairs.entries()]
    .reduce((resMap, chr) => resMap.set(chr[0][0], (resMap.get(chr[0][0]) || 0) + chr[1]), new Map().set(finalChar, 1));
charOccurences = [...charOccurences.entries()].sort((a, b) => a[1] - b[1]);
console.log('Part 2:', charOccurences[charOccurences.length - 1][1] - charOccurences[0][1]);

function doGroupedPairInsertion(polymerPairs) {
    let expandedPolymerPairs = new Map();
    for(let polymerPair of [...polymerPairs.keys()]) {
        let rule = insertionRules.find(r => polymerPair === r.pair);
        let leftKey = `${polymerPair[0]}${rule.insertion}`;
        let rightKey = `${rule.insertion}${polymerPair[1]}`;
        expandedPolymerPairs.set(leftKey, (expandedPolymerPairs.get(leftKey) || 0) + polymerPairs.get(polymerPair));
        expandedPolymerPairs.set(rightKey, (expandedPolymerPairs.get(rightKey) || 0) + polymerPairs.get(polymerPair));
    }
    return expandedPolymerPairs;
}
