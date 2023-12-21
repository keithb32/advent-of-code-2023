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

let totalPts = 0;
lines.forEach((line) => {
    let winningNums = line.match(winningNumPattern).at(0).trim().split(/\s+/);
    let myNums = line.match(myNumPattern).at(0).trim().split(/\s+/);

    let [pts, n] = [0, 0];
    myNums.forEach((num) => {
        if (winningNums.includes(num)){
            pts = 2 ** n++;
        }
    })
    totalPts += pts;
});
console.log(totalPts);
