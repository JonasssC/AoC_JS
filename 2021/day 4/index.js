const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

let lines = input
    .split('\r\n');

function parseNumbersAndCards(lines) {
    let linesCopy = lines.slice();
    let numbers = linesCopy.shift().split(',').map(Number);

    let cards = []
    linesCopy.shift();
    let card = [];
    for(let line of linesCopy) {
        if(line === "") {
            cards.push(card);
            card = [];
        } else {
            card.push(line.split(/\s+/).map(Number));
        }
    }

    return { numbers: numbers, cards: cards };
}


let game = parseNumbersAndCards(lines);

let winner;
let num;

for(num of game.numbers) {
    callNumber(game.cards, num);
    winner = findWinner(game.cards);
    if(winner) break;
}

let sum = leftOverSum(winner);

console.log('Part 1:', sum * num);

function callNumber(cards, num) {
    for(let card of cards)
        for(let i = 0; i < card.length; i++)
            for(let j = 0; j < card[i].length; j++)
                if(card[i][j] === num) card[i][j] = 'checked';
}

function findWinner(cardsToCheck) {
    for(let card of cardsToCheck)
        if(isWinner(card)) return card;

    return undefined;
}

function isWinner(cardToCheck) {
    for(let i = 0; i < cardToCheck.length; i++) {
        let winningRow = true;
        let winningCol = true;
        for(let j = 0; j < cardToCheck.length && (winningRow || winningCol); j++) {
            if(cardToCheck[i][j] !== 'checked')
                winningRow = false;
            if(cardToCheck[j][i] !== 'checked')
                winningCol = false;
        }
        if (winningRow || winningCol) return true;
    }

    return false;
}

function leftOverSum(card) {
    let sum = 0;
    for(let row of card)
        for(let square of row)
            if(square !== 'checked') sum += square;
    return sum;
}


// Part 2

game = parseNumbersAndCards(lines);

let lastWinner;
let lastWinNum;

for(num of game.numbers) {
    callNumber(game.cards, num)
    winner = findWinner(game.cards);

    if(winner) {
        game.cards = game.cards.filter(card => !isWinner(card));
        lastWinner = winner;
        lastWinNum = num;
    }
}

sum = leftOverSum(lastWinner);

console.log('Part 2:', sum * lastWinNum);
