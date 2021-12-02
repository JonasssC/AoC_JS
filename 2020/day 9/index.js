const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let numbers = input
    .split('\r\n')
    .filter(line => line !== "")
    .map(line => Number(line));

let invalid;

for(let i = 25; i < numbers.length; i++) {
    if(!isValidAtIndex(i)) {
        invalid = numbers[i];
        break;
    }
}

console.log(`Part 1: ${invalid}`);

function isValidAtIndex(index) {
    for(let i = -1; i >= -25; i--) {
        for (let j = -1; j >= -25; j--) {
            if (numbers[index + i] !== numbers[index + j] && numbers[index + i] + numbers[index + j] === numbers[index])
                return true;
        }
    }
    return false;
}

// Part 2
let smallest;
let largest;

for(let i = 0; i < numbers.length; i++) {
    let sum = numbers[i];
    smallest = numbers[i];
    largest = numbers[i];
    for(let j = i + 1; j < numbers.length; j++) {
        sum += numbers[j];
        if(numbers[j] < smallest) smallest = numbers[j];
        if(numbers[j] > largest) largest = numbers[j];

        if(sum === invalid) break;
    }

    if(sum === invalid) break;
}

console.log(`Part 2: ${smallest + largest}`);
