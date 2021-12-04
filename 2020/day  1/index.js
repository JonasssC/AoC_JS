const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let nums = input
    .split('\r\n')
    .filter(line => line !== "")
    .map(num => Number(num));

for(let num1 of nums)
    for(let num2 of nums)
        if(num1 + num2 === 2020)
            console.log(`Part 1: ${num1 * num2}`);

// Part two

for(let num1 of nums)
    for(let num2 of nums)
        for(let num3 of nums)
            if(num1 + num2 + num3 === 2020)
                console.log(`Part 1: ${num1 * num2 * num3}`);
