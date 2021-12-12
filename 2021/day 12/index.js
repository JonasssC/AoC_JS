const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').trim()
let graphs = input
    .split('\r\n')
    .map(l => l.split('-'))
    .reduce((graphs, path) => {
        graphs.set(path[0], (graphs.has(path[0]) ? graphs.get(path[0]) : new Set()).add(path[1]));
        graphs.set(path[1], (graphs.has(path[1]) ? graphs.get(path[1]) : new Set()).add(path[0]));
        return graphs;
    }, new Map());

let paths = findAllPaths1('start', 'end');
console.log('Part 1:', paths.length);

function findAllPaths1(from, to, currentPath = [from]) {
    let paths = [];

    if(from === to) return [currentPath];

    for(let direction of graphs.get(from)) {
        if(isLowerCase(direction) && currentPath.includes(direction)) continue;
        let path = currentPath.slice();
        path.push(direction);
        paths = paths.concat(findAllPaths1(direction, to, path));
    }

    return paths;
}

function isLowerCase(str) {
    return str.toLowerCase() === str;
}

// Part 2
paths = findAllPaths2('start', 'end');
console.log('Part 2:', paths.length);

function findAllPaths2(from, to, currentPath = [from], doubled = false) {
    let paths = [];

    if(from === to) return [currentPath];

    for(let direction of graphs.get(from)) {
        let doubledHere = doubled;
        if(isLowerCase(direction) && currentPath.includes(direction)) {
            if(doubled || direction === 'start') continue;
            doubledHere = true;
        }
        let path = currentPath.slice();
        path.push(direction);
        paths = paths.concat(findAllPaths2(direction, to, path, doubledHere));
    }
    return paths;
}
