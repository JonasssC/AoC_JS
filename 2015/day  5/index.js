const fs = require('fs');

let strings = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\r\n');

let niceCount = strings.reduce((count, string) => isNice1(string) ? count + 1 : count, 0);

console.log('Part 1:', niceCount);

function isNice1(string) {
    if ([...string.matchAll(/[aeiou]/g)].length < 3) return false;
    if (!string.match(/(.)\1/g)) return false;
    return !string.match(/ab|cd|pq|xy/);

}

// Part 2
niceCount = strings.reduce((count, string) => isNice2(string) ? count + 1 : count, 0);

console.log('Part 2:', niceCount);

function isNice2(string) {
    if (!string.match(/(..).*\1/)) return false;
    return string.match(/(.).\1/);
}
