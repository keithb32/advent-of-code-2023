const fs = require('fs');
const FILE_PATH = './input.txt';

// Regex patterns
const digitPattern = /\d/;

// Store input as array of strings
const grid = [];
fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' })
    .split(/\r?\n/)
    .forEach((line) => grid.push(line));

const getAdjacentVals = (i, j) => {
    const adjacentVals = [];
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // horizontal and vertical
        [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonal
    ];

    for (const [dr, dc] of directions) {
        const newRow = i + dr;
        const newCol = j + dc;

        // Check if the new coordinates are within the bounds of the grid
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            adjacentVals.push({ val: grid[newRow][newCol], row: newRow, col: newCol });
        }
    }

    return adjacentVals;
}

const isGear = (adjPartNumbers) => {
    adjPartNumbers.sort((a, b) => a.row - b.row || a.col - b.col)

    let num = 0;
    let prev = {val: -666, row: -666, col: -666}; // dummy value to ensure first partNumber adds to the count
    for (let i = 0; i < adjPartNumbers.length; i++){
        let cur = adjPartNumbers[i];

        if (cur.row !== prev.row || cur.col - prev.col > 1){
            num++;
        }
        
        prev = adjPartNumbers[i];
    }

    return num === 2;
}



const gearRatio = (i, j) => {
    const adjVals = getAdjacentVals(i, j);
    const adjPartNumbers = adjVals.filter((v) => digitPattern.test(v.val));

    if (isGear(adjPartNumbers)) {
        let [i1, j1, i2, j2] = [adjPartNumbers[0].row, adjPartNumbers[0].col, adjPartNumbers[adjPartNumbers.length-1].row, adjPartNumbers[adjPartNumbers.length-1].col];
        let [partNum1, partNum2] = ['', ''];

        // Find leftmost digit of part number, then traverse right to read the entire part number
        while(digitPattern.test(grid[i1][--j1])){}
        while(digitPattern.test(grid[i1][++j1])){ partNum1 += grid[i1][j1]; } 

        while(digitPattern.test(grid[i2][--j2])){}
        while(digitPattern.test(grid[i2][++j2])){ partNum2 += grid[i2][j2] }

        //console.log(`i: ${i} j: ${j} p1: ${partNum1} p2: ${partNum2}`)
        return partNum1 * partNum2;
    }
    else {
        return 0;
    }

}

let sum = 0;
grid.forEach((line, i) => {
    [...line].forEach((c, j) => {
        if (c === '*'){
            sum += gearRatio(i, j);
        }
    })
})
console.log(sum);