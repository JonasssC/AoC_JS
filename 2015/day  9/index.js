const fs = require('fs');

let distances = fs.readFileSync('input.txt', 'utf8').trim()
    .split('\r\n')
    .map(l => l.split(' '))
    .reduce((graphs, path) => {
        graphs.set(path[0], (graphs.has(path[0]) ? graphs.get(path[0]) : new Map()).set(path[2], Number(path[4])));
        graphs.set(path[2], (graphs.has(path[2]) ? graphs.get(path[2]) : new Map()).set(path[0], Number(path[4])));
        return graphs;
    }, new Map());

console.log('Part 1:', findShortestRouteAcrossAllDestinations(distances));

function findShortestRouteAcrossAllDestinationsStartingFrom(distances, startingFrom) {
    let shortestDistance;

    let leftOverDistances = new Map([...distances].filter(([k, _]) => k !== startingFrom));

    for(let pos of leftOverDistances.keys()) {
        let distance = distances.get(startingFrom).get(pos)
        distance += findShortestRouteAcrossAllDestinationsStartingFrom(leftOverDistances, pos);
        if(!shortestDistance || distance < shortestDistance)
            shortestDistance = distance;
    }

    return shortestDistance || 0;
}

function findShortestRouteAcrossAllDestinations(distances) {
    let shortestDistance;

    for(let pos of distances.keys()) {
        let distance = findShortestRouteAcrossAllDestinationsStartingFrom(distances, pos);
        if(!shortestDistance || distance < shortestDistance)
            shortestDistance = distance;
    }

    return shortestDistance;
}

// Part 2:
console.log('Part 2:', findLongestRouteAcrossAllDestinations(distances));

function findLongestRouteAcrossAllDestinationsStartingFrom(distances, startingFrom) {
    let longestDistance;

    let leftOverDistances = new Map([...distances].filter(([k, _]) => k !== startingFrom));

    for(let pos of leftOverDistances.keys()) {
        let distance = distances.get(startingFrom).get(pos)
        distance += findLongestRouteAcrossAllDestinationsStartingFrom(leftOverDistances, pos);
        if(!longestDistance || distance > longestDistance)
            longestDistance = distance;
    }

    return longestDistance || 0;
}

function findLongestRouteAcrossAllDestinations(distances) {
    let longestDistance;

    for(let pos of distances.keys()) {
        let distance = findLongestRouteAcrossAllDestinationsStartingFrom(distances, pos);
        if(!longestDistance || distance > longestDistance)
            longestDistance = distance;
    }

    return longestDistance;
}
