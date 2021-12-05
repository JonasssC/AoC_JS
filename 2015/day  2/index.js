const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let boxes = input.split('\r\n')
    .filter(line => line !== '')
    .map(box => box.split('x').map(Number));

let totalSquareFeet = 0;

for(let box of boxes) {
    let sides = box.map((val, i) => val * box[(i + 1) % 3]);
    let smallestSide = sides.reduce((res, side) => side < res ? side : res, sides[0]);
    totalSquareFeet += sides.reduce((sum, side) => sum + 2 * side, smallestSide);
}

console.log('Part 1:', totalSquareFeet);

// Part 2
let totalRibbonLength = 0;

for(let box of boxes) {
    let perimeters = box.map((val, i) => 2 * (val + box[(i + 1) % 3]));
    let smallestPerimeter = perimeters.reduce((res, perim) => perim < res ? perim : res, perimeters[0]);
    let volume = box.reduce((res, side) => side * res, 1);
    totalRibbonLength += smallestPerimeter + volume;
}

console.log('Part 2:', totalRibbonLength);
