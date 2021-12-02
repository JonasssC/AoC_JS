const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n');

let count = 0;

let required = {byr: true, iyr: true, eyr: true, hgt: true, hcl: true, ecl: true, pid: true, cid: false};
let currentPassport = {byr: undefined, iyr: undefined, eyr: undefined, hgt: undefined, hcl: undefined, ecl: undefined, pid: undefined, cid: undefined};

for(let line of lines) {
    if(line === "") {
        if(checkPassport(required, currentPassport)) count++;
        resetPassport(currentPassport);
    } else {
        for(let field of line.split(' ')) {
            let splitField = field.split(':')
            currentPassport[splitField[0]] = splitField[1];
        }
    }
}

function resetPassport(currentPassport) {
    for(let key of Object.keys(currentPassport))
        currentPassport[key] = undefined;
}

function checkPassport(required, passport) {
    for(let key of Object.keys(required))
        if(required[key] && !passport[key]) return false;
    return true;
}

console.log(`Part 1: ${count}`);

// Part 2

count = 0;

let conditions = {
    byr(value) {
        if(!value) return false;
        return value >= 1920 && value <= 2002;
    },
    iyr(value) {
        if(!value) return false;
        return value >= 2010 && value <= 2020;
    },
    eyr(value) {
        if(!value) return false;
        return value >= 2020 && value <= 2030;
    },
    hgt(value) {
        if(!value) return false;

        let format = value.slice(value.length - 2, value.length);
        let size = value.slice(0, value.length - 2);

        switch (format) {
            case "cm":
                return size >= 150 && size <= 193;
            case "in":
                return size >= 59 & size <= 76;
            default:
                return false;
        }
    },
    hcl(value) {
        if(!value) return false;

        return RegExp(/#[0-9a-f]{6}/).test(value);
    },
    ecl(value) {
        if(!value) return false;

        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    },
    pid(value) {
        if(!value) return false;

        return RegExp(/^\d{9}$/).test(value);
    },
    cid(value) {
        return true;
    }
}

for(let line of lines) {
    if(line === "") {
        if(checkPassportConditions(conditions, currentPassport)) count++;
        resetPassport(currentPassport);
    } else {
        for(let field of line.split(' ')) {
            let splitField = field.split(':')
            currentPassport[splitField[0]] = splitField[1];
        }
    }
}

console.log(`Part 2: ${count}`);


function checkPassportConditions(conditions, passport) {
    for(let key of Object.keys(conditions))
        if (!conditions[key](passport[key])) {
            console.log(key, passport[key]);
            return false;
        }
    return true;
}
