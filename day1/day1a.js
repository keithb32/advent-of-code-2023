const fs = require('fs');
const FILE_PATH = './input.txt';

const computeCalibration = (line) => {
    let calibration = 0;

    // Find first digit in string
    for (let i = 0; i < line.length; i++){
        if (line[i].match(/[0-9]/)){
            calibration += parseInt(line[i])*10;
            break;
        }
    }
    // Find last digit in string (could be same as first digit)
    for (let j = line.length-1; j >= 0; j--){
        if (line[j].match(/[0-9]/)){
            calibration += parseInt(line[j]);
            break; 
        }
    }
    
    return calibration;
}

// Read file line-by-line, compute calibration of each line and sum them
let calibration = 0;
const fileContents = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
fileContents.split(/\r?\n/).forEach((line) => {
    calibration += computeCalibration(line);
})

console.log(calibration);


