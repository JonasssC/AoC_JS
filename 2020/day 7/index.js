const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n')
    .filter(line => line !== "");

let bags = new Map();

for(let line of lines) {
    let splitLine = line.split(' contain ');
    let bagInfo = splitLine[0].split(' ');

    let bag = {
        color: `${bagInfo[0]} ${bagInfo[1]}`,
        contains: [],
        containsShinyGold: false,
        checked: false
    }
    if (!splitLine[1].startsWith('no')) {
        for (let containedBag of splitLine[1].split(', ')) {
            bagInfo = containedBag.split(' ');
            bag.contains.push({
                count: Number(bagInfo[0]),
                color: `${bagInfo[1]} ${bagInfo[2]}`
            });
        }
    }

    bags.set(bag.color, bag);
}

function markBagsContaining(color) {
    bags.get(color).checked = true;

    for(let bag of bags.values()) {
        if(bag.contains.map(b => b.color).includes(color)) {
            bag.containsShinyGold = true;
            if(!bag.checked) {
                markBagsContaining(bag.color);
            }
        }
    }
}

markBagsContaining('shiny gold');

let count = [...bags.values()].filter(bag => bag.containsShinyGold).length;

console.log(`Part 1: ${count}`);


// Part 2

function countBagsIn(color) {
    let bag = bags.get(color);
    count = 0;

    for(let inside of bag.contains) {
        count += inside.count;
        count += countBagsIn(inside.color) * inside.count;
    }

    return count;
}

count = countBagsIn('shiny gold');

console.log(`Part 2: ${count}`);
