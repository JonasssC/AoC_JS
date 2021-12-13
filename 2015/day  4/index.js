const fs = require('fs');
const md5 = require('md5');

let letterCode = fs.readFileSync('input.txt', 'utf8').trim();

let resultHash = '';
let i;
for(i = 0; !resultHash.startsWith('00000'); i++) resultHash = md5(`${letterCode}${i}`);

console.log('Part 1:', --i);

// Part 2
resultHash = '';
for(i = 0; !resultHash.startsWith('000000'); i++) resultHash = md5(`${letterCode}${i}`);

console.log('Part 2:', --i);
