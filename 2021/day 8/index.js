const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\r\n')
    .map(ln => ln.split(' | ').map(p => p.split(' ')));

const digits = {
    0: 'abcefg',
    1: 'cf',
    2: 'acdeg',
    3: 'acdfg',
    4: 'bcdf',
    5: 'abdfg',
    6: 'abdefg',
    7: 'acf',
    8: 'abcdefg',
    9: 'abcdfg'
}

let count = new Array(10).fill(0);

for(let row of input)
    for(let part of row[1])
        for(let i in count)
            if(part.length === digits[i].length) count[i]++;

console.log('Part 1:', count[1] + count[4] + count[7] + count[8]);

// Part 2
const containsNum = (num, contains) => contains.split('').reduce((res, val) => res && num.includes(val), true);
const equalsNum = (num1, num2) => num1.length === num2.length && containsNum(num1, num2);

let sum = 0;
for(let row of input) {
    let displays = new Array(10).fill(undefined);
    displays[1] = row[0].find(s => s.length === digits[1].length);
    displays[4] = row[0].find(s => s.length === digits[4].length);
    displays[7] = row[0].find(s => s.length === digits[7].length);
    displays[8] = row[0].find(s => s.length === digits[8].length);

    displays[3] = row[0].find(s => s.length === digits[3].length && containsNum(s, displays[1]));
    displays[6] = row[0].find(s => s.length === digits[6].length && !containsNum(s, displays[1]));
    displays[9] = row[0].find(s => s.length === digits[9].length && containsNum(s, displays[4]));
    displays[0] = row[0].find(s => s.length === digits[0].length && s !== displays[6] && s !== displays[9]);
    displays[5] = row[0].find(s => s.length === digits[5].length && containsNum(displays[6], s));
    displays[2] = row[0].find(s => !displays.includes(s));

    let res = "";
    for(let num of row[1]) {
        for(let i = 0; i < 10; i++) {
            if(equalsNum(num, displays[i])) {
                res += i;
                break;
            }
        }
    }
    sum += Number(res);
}

console.log('Part 2:', sum);
