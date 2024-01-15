const fs = require('fs');
const FILE_PATH = './input.txt';

// Test area
const AREA_MIN = 200000000000000;
const AREA_MAX = 400000000000000;

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

let s1, s2, m1, b1, m2, b2, inPath1, inPath2, numIntersect=0;
for (let i = 0; i < hailstones.length; i++){
    s1 = hailstones[i];
    m1 = s1.vy / s1.vx; // slope
    b1 = s1.py - m1*s1.px; // intercept

    for (let j=i+1; j < hailstones.length; j++){
        s2 = hailstones[j];
        m2 = s2.vy / s2.vx
        b2 = s2.py - m2*s2.px

        // Throw out extraneous solutions (systems of non-equivalent parallel lines)
        if (m1 == m2 && b1 != b2) { continue }

        x_intersect = (b2 - b1)/(m1 - m2)
        y_intersect = m1*x_intersect + b1

        // Throw out solution if intersection isn't in both of the hailstones' paths
        inPath1 = (s1.vx >= 0 ? x_intersect >= s1.px : x_intersect <= s1.px) && (s1.vy >= 0 ? y_intersect >= s1.py : y_intersect <= s1.py)
        inPath2 = (s2.vx >= 0 ? x_intersect >= s2.px : x_intersect <= s2.px) && (s2.vy >= 0 ? y_intersect >= s2.py : y_intersect <= s2.py)
        if (!inPath1 || !inPath2) { continue }

        if (x_intersect >= AREA_MIN && x_intersect <= AREA_MAX && y_intersect >= AREA_MIN && y_intersect <= AREA_MAX){
            numIntersect++
        }
    }
}

console.log(numIntersect);