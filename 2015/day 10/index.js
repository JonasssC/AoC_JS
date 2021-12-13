const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim();

function expandInput(inp) {
    return inp.split('').reduce((res, val) => {
        if(res.length > 0 && res[res.length-1].val === val)
            res[res.length-1].count++;
        else
            res.push({ val: val, count: 1 });
        return res;
    }, []).map(part => `${part.count}${part.val}`).join('');
}

let result = input;
for(let i = 0; i < 40; i++) result = expandInput(result);
console.log('Part 1:', result.length);

// Part 2
for(let i = 0; i < 10; i++) result = expandInput(result);
console.log('Part 2:', result.length);
