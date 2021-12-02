const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let ratings = input
    .split('\r\n')
    .filter(line => line !== "")
    .map(line => Number(line));

let count = {
    1: 0,
    2: 0,
    3: 0
}

ratings = ratings.sort((a, b) => a - b);

let prev = 0;

for(let rating of ratings) {
    if(rating - prev <= 3) {
        count[rating - prev]++;
    } else break;

    prev = rating;
}

// Build in adapter
count[3]++;

console.log(`Part 1: ${count[1] * count[3]}`);

// Part 2

let max = prev;

let countFollowingFromMap = new Map();
console.log(ratings);
function countFollowingFrom(num) {
    if(num === max) return 1;
    let count = 0;
    for(let rating of ratings) {
        if(rating > num && rating - num <= 3) {
            if(countFollowingFromMap.has(rating)) {
                count += countFollowingFromMap.get(rating);
            } else {
                let subcount = countFollowingFrom(rating);
                countFollowingFromMap.set(rating, subcount);
                count += subcount;
            }
        }
    }
    return count;
}

console.log(`Part 2: ${countFollowingFrom(0)}`);
