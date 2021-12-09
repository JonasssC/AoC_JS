const fs = require('fs');

let heightMap = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\r\n')
    .map(row => row.split('').map(Number));

let lowPoints = [];

for(let row in heightMap) {
    for (let col in heightMap[row]) {
        if (isLowest(Number(row), Number(col))) lowPoints.push( { x: Number(col), y: Number(row) });
    }
}

console.log('Part 1:', lowPoints.reduce((sum, pos) => sum + heightMap[pos.y][pos.x] + 1, 0));

function isLowest(row, col) {
    if(row - 1 >= 0 && heightMap[row - 1][col] <= heightMap[row][col]) return false;
    if(row + 1 < heightMap.length && heightMap[row + 1][col] <= heightMap[row][col]) return false;
    if(col - 1 >= 0 && heightMap[row][col - 1] <= heightMap[row][col]) return false;
    return !(col + 1 < heightMap[row].length && heightMap[row][col + 1] <= heightMap[row][col]);
}

// Part 2
let basins = new Set();

for(let lowPoint of lowPoints) basins.add(getBasin(lowPoint));

function getBasin(lowPoint) {
    let basin = new Set();
    affectAdjacent(basin, lowPoint);
    return basin;
}

function affectAdjacent(basin, point) {
    let pointKey = `${point.y}-${point.x}`;
    if(isPointWithinMap(point) && !basin.has(pointKey) && heightMap[point.y][point.x] !== 9) {
        basin.add(pointKey);

        affectAdjacent(basin, { x: point.x - 1, y: point.y })
        affectAdjacent(basin, { x: point.x + 1, y: point.y })
        affectAdjacent(basin, { x: point.x, y: point.y - 1 })
        affectAdjacent(basin, { x: point.x, y: point.y + 1 })
    }
}

function isPointWithinMap(point) {
    return (point.y >= 0 && point.y < heightMap.length
         && point.x >= 0 && point.x < heightMap[point.y].length);
}

let sortedBasins = [...basins].sort((a, b) => b.size - a.size);

console.log('Part 2:', sortedBasins[0].size * sortedBasins[1].size * sortedBasins[2].size);
