const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let count = countOccurenceOf1PerPosition(lines);

let gamma = parseInt(calcGammaBin(lines, count), 2);
let epsilon = parseInt(calcEpsilonBin(lines, count), 2);

console.log("Part 1: ", gamma * epsilon);

function countOccurenceOf1PerPosition(items) {
    let count = new Array(items[0].length).fill(0);

    for (let item of items)
        for (let i = 0; i < item.length; i++)
            if(item[i] === '1') count[i]++;

    return count;
}

function calcGammaBin(items, count = countOccurenceOf1PerPosition(items)) {
    return count.map(c => c >= items.length / 2 ? '1' : '0').join('');
}

function calcEpsilonBin(items, count = countOccurenceOf1PerPosition(items)) {
    return count.map(c => c >= items.length / 2 ? '0' : '1').join('');
}

// Part 2

let oxygen = parseInt(calcOxygenBin(lines), 2);
let co2 = parseInt(calcCo2Bin(lines), 2);

console.log("Part 2: ", oxygen * co2);

function calcOxygenBin(items) {
    return calcFilterBin(items, calcGammaBin);
}

function calcCo2Bin(items) {
    return calcFilterBin(items, calcEpsilonBin);
}

function calcFilterBin(items, filter) {
    let filteredItems = items.slice();

    for (let i = 0; filteredItems.length > 1 && i < filteredItems[0].length; i++) {
        let epsilonBin = filter(filteredItems);
        filteredItems = filteredItems.filter(item => item[i] === epsilonBin[i]);
    }

    return filteredItems[0];
}
