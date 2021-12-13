const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\r\n\r\n');

let dots = input[0]
    .split('\r\n')
    .map(l => l.split(',').map(Number))
    .map(l => ({ x: l[0], y: l[1] }))
    .reduce((resSet, dot) => resSet.add(JSON.stringify(dot)), new Set());

let folds = input[1]
    .split('\r\n')
    .map(l => l.split(' ')[2].split('='))
    .map(f => ({ dir: f[0], line: Number(f[1]) }));

doFold(folds.shift());

console.log('Part 1:', dots.size);

function doFold(fold) {
    let newDots = new Set();
    for(let dot of dots) {
        let parsedDot = JSON.parse(dot);
        if(parsedDot[fold.dir] >= fold.line) parsedDot[fold.dir] = fold.line - (parsedDot[fold.dir] - fold.line);
        newDots.add(JSON.stringify(parsedDot));
    }
    dots = newDots;
}

// Part 2
for(let fold of folds) doFold(fold);

console.log('Part 2:');
drawDots();

function drawDots() {
    let parsedDots = [...dots].map(JSON.parse);
    let maxY = parsedDots.reduce((max, val) => max < val.y ? val.y : max, 0);
    let maxX = parsedDots.reduce((max, val) => max < val.x ? val.x : max, 0);
    for(let i = 0; i <= maxY; i++) {
        let line = '';
        for(let j = 0; j <= maxX; j++)
            line += dots.has(`{"x":${j},"y":${i}}`) ? '█' : ' ';
        console.log(line);
    }
}
