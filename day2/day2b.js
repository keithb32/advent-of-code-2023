const fs = require('fs');
const FILE_PATH = './input.txt';

// Return the power of the game
const power = (game) => {
    let redValues = [...game.matchAll(/\d+(?= red)/g)].map((val) => val[0]);
    let greenValues = [...game.matchAll(/\d+(?= green)/g)].map((val) => val[0]);
    let blueValues = [...game.matchAll(/\d+(?= blue)/g)].map((val) => val[0]);

    let result = Math.max(...redValues) * Math.max(...greenValues) * Math.max(...blueValues);
    return result;
}

// Read file line-by-line, compute power of each game, and sum them
let sum = 0;
const fileContents = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
fileContents.split(/\r?\n/).forEach((game) => {
    sum += power(game);
})

console.log(sum);