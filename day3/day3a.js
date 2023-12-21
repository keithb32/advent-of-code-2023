const fs = require('fs');
const FILE_PATH = './input.txt';

// Regex patterns
const digitPattern = /\d+/g;
const symbolPattern = /[^A-Za-z.0-9]/g;

// Store input as array of strings
const grid = [];
fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' })
    .split(/\r?\n/)
    .forEach((line) => grid.push(line));

// Return [start, start+1, ..., start+len-1]
const range = (start, len) => {
    return Array.from({length: len}, (v, i) => i + start);
}

const getAdjacentVals = (i, j) => {
    const adjacentVals = [];
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // horizontal and vertical
        [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal
    ];

    for (const [dr, dc] of directions) {
        const newRow = i + dr;
        const newCol = j + dc;

        // Check if the new coordinates are within the bounds of the grid
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            adjacentVals.push(grid[newRow][newCol]);
        }
    }

    return adjacentVals;
}


const isPartNumber = (match) => {
    let result = false;
    
    let row = match.row;
    match.cols.forEach((col) => {
        const adjacentVals = getAdjacentVals(row, col);

        if (adjacentVals.some((cell) => symbolPattern.test(cell))){
            result = true;
        }
    })

    return result;
}

let sum = 0;
grid.forEach((line, i) => {
    let matches = [...line.matchAll(digitPattern)].map((m) => ({val: m[0], row: i, cols: range(m.index, m[0].length)}) );

    // Check if matches are a part number. Add them if they are a part number.
    matches.forEach((m, j) => {
        if (isPartNumber(m)){
            sum += parseInt(m.val)
        }
    })
})
console.log(sum);