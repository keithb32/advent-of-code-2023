const fs = require('fs');
const FILE_PATH = './input.txt';

// Regex patterns
const winningNumPattern = /(?<=:).+(?=\|)/;
const myNumPattern = /(?<=\|).+/;

// Store input as array of strings
const lines = [];
fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' })
    .split(/\r?\n/)
    .forEach((line) => lines.push(line));

let numCards = 0;
let copiesByNum = {};
lines.forEach((line, i) => {
    let cardNum = i + 1;
    let winningNums = line.match(winningNumPattern).at(0).trim().split(/\s+/);
    let myNums = line.match(myNumPattern).at(0).trim().split(/\s+/);

    copiesByNum[cardNum] = copiesByNum[cardNum] ? ++copiesByNum[cardNum] : 1;
    let copies = copiesByNum[cardNum];

    for (let i = 0; i < copies; i++){
        let numWinning = 0;
        myNums.forEach((num) => {
            if (winningNums.includes(num)){
                let copyCardNum = ++numWinning+cardNum;
                let numCopies = copiesByNum[copyCardNum];
                copiesByNum[copyCardNum] = numCopies ? ++numCopies : 1;
            }
        })
    }
    numCards += copiesByNum[cardNum];
});

console.log(numCards);