const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let fish = input.split(',').map(Number);

let length = [...growFish(fish, 80).values()].reduce((sum, f) => sum + f, 0);
console.log('Part 1:', length);

// Part 2
length = [...growFish(fish, 256).values()].reduce((sum, f) => sum + f, 0);
console.log('Part 2:', length);

function growFish(fish, days) {
    let compactFish = fish.reduce((fishMap, f) => fishMap.set(f, (fishMap.get(f) || 0) + 1), new Map());
    for(let i = 0; i < days; i++) {
        let newCompactFish = new Map();

        for(let key of [...compactFish.keys()].sort()) {
            if(key - 1 < 0) {
                newCompactFish.set(6, compactFish.get(key));
                newCompactFish.set(8, compactFish.get(key));
            } else if(key === 7) {
                let sixCount = newCompactFish.has(6) ? newCompactFish.get(6) : 0;
                newCompactFish.set(key - 1, sixCount + compactFish.get(key))
            } else {
                newCompactFish.set(key - 1, compactFish.get(key));
            }
        }

        compactFish = newCompactFish;
    }

    return compactFish;
}
