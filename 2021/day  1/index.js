const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let nums = input
    .split('\r\n')
    .filter(line => line !== "")
    .map(num => Number(num));

let countIncreased = 0;

for(let i = 1; i < nums.length; i++) {
    if(nums[i] > nums[i-1]) countIncreased++;
}

console.log(`Part 1: ${countIncreased}`);

// Part two

countIncreased = 0;

for(let i = 3; i < nums.length; i++) {
    if(nums[i] > nums[i - 3]) countIncreased++;
}

console.log(`Part 2: ${countIncreased}`);
