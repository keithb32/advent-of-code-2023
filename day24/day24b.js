const fs = require('fs');
const FILE_PATH = './input.txt';

// Regex patterns
const positionPattern = /\d+, \d+, \d+(?= @)/;
const velocityPattern = /(?<=@)(\s+-?\d+),(\s+-?\d+),(\s+-?\d+)/;

let pos, vel, hailstones = [];
fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' })
    .split(/\r?\n/)
    .forEach((line, i) => {
        pos = line.match(positionPattern).at(0).trim().split(/\s+/).map(s => parseInt(s));
        vel = line.match(velocityPattern).at(0).trim().split(/\s+/).map(s => parseInt(s));
        hailstones.push({ px: pos[0], py: pos[1], pz: pos[2], vx: vel[0], vy: vel[1], vz: vel[2] });
    });

let s1, s2, m1, b1, m2, b2;
for (let i = 0; i < hailstones.length; i++){
    s1 = hailstones[i];
    m1 = s1.vy / s1.vx; // slope
    b1 = s1.py - m1*s1.px; // intercept

    for (let j=i+1; j < hailstones.length; j++){
        s2 = hailstones[j];
        m2 = s2.vy / s2.vx
        b2 = s2.py - m2*s2.px
    }
}

console.log(numIntersect);