const fs = require('fs');
const FILE_PATH = './input.txt';

// Bag contents
const TOTAL_RED = 12;
const TOTAL_GREEN = 13;
const TOTAL_BLUE = 14;

// Return the game's id if the game is valid, 0 otherwise
const isValidGame = (game) => {
    let gameId = parseInt(game.match(/(?<=Game )\d+/));
    
    let valid = true;
    
    let redValues = [...game.matchAll(/\d+(?= red)/g)]; 
    let greenValues = [...game.matchAll(/\d+(?= green)/g)];
    let blueValues = [...game.matchAll(/\d+(?= blue)/g)];

    redValues.forEach((val) => { if (val > TOTAL_RED) valid = false; })
    greenValues.forEach((val) => { if (val > TOTAL_GREEN) valid = false; })
    blueValues.forEach((val) => { if (val > TOTAL_BLUE) valid = false; })

    return valid ? gameId : 0;
}


// Read file line-by-line, compute calibration of each line and sum them
let sum = 0;
const fileContents = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
fileContents.split(/\r?\n/).forEach((game) => {
    sum += isValidGame(game);
})

console.log(sum);