const fs = require('fs');
const FILE_PATH = './input.txt';

// Use positive lookahead in regular expression so that cursor doesn't consume input. Important for overlapping cases, e.g. "oneight" => 18
const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const REGEX = new RegExp(`(?=(${WORDS.join("|")}|[0-9]))`, 'g'); 

const valueOfNumberWord = (numberWord) => WORDS.indexOf(numberWord) + 1;

const computeCalibration = (line) => {
    let calibration = 0;

    // Find all matches
    let matches = [...line.matchAll(REGEX)];

    // Select index 1 because index 0 is the empty string
    // (index 1 is the lookahead value that was matched)
    let firstMatch = matches[0][1];
    if (WORDS.includes(firstMatch)){
        calibration += 10 * valueOfNumberWord(firstMatch);
    }
    else{
        calibration += 10 * parseInt(firstMatch);
    }

    // Select index 1 because index 0 is the empty string
    // (index 1 is the lookahead value that was matched)
    let lastMatch = matches[matches.length-1][1];
    if (WORDS.includes(lastMatch)){
        calibration += valueOfNumberWord(lastMatch);
    }
    else{
        calibration += parseInt(lastMatch);
    }

    // Uncomment for debugging
    //console.log(matches);
    //console.log(`matches: ${matches} calibration: ${calibration}`)

    return calibration;
}   

// Read file line-by-line, compute calibration of each line, and sum them
let calibration = 0;
const fileContents = fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' });
fileContents.split(/\r?\n/).forEach((line) => {
    calibration += computeCalibration(line);
})

console.log(calibration);


