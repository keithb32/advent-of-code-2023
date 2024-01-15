const fs = require('fs');
const FILE_PATH = './input.txt';

// Regex patterns
const seedNumPattern = /(?<=seeds: ).+/;
const headerPattern = /[a-z- ]+(?=:)/;
const srcDestLenPattern = /\d+ \d+ \d+/;

// Global variables
var header = "";
var seedValues = [];
var seeds = [];
var seedSoilMaps = [];
var soilFertMaps = [];
var fertWaterMaps = [];
var waterLightMaps = [];
var lightTempMaps = [];
var tempHumidMaps = [];
var humidLocnMaps = [];

const applyToArr = (callback) => {
    if (header === 'seed-to-soil map'){
        callback(seedSoilMaps);
    }
    else if (header === 'soil-to-fertilizer map'){
        callback(soilFertMaps);
    }
    else if (header === 'fertilizer-to-water map'){
        callback(fertWaterMaps);
    }
    else if (header === 'water-to-light map'){
        callback(waterLightMaps);
    }
    else if (header === 'light-to-temperature map'){
        callback(lightTempMaps);
    }
    else if (header === 'temperature-to-humidity map'){
        callback(tempHumidMaps);
    }
    else if (header === 'humidity-to-location map'){
        callback(humidLocnMaps);
    }
}

// Return [start, start+1, ..., start+len-1]
const range = (start, len) => {
    return Array.from({length: len}, (v, i) => i + start);
}

// --- Driver code --- //

// Read file
fs.readFileSync(FILE_PATH, { encoding: 'utf8', flag: 'r' })
    .split(/\r?\n/)
    .forEach(
        (line) => {
            if (headerPattern.test(line)){
                header = line.match(headerPattern).at(0);
            }
            if (header === 'seeds' && seeds.length == 0){
                seeds = line.match(seedNumPattern).at(0).split(" ").map((s) => parseInt(s));
            }
            else {
                if (srcDestLenPattern.test(line)){
                    let [dest, src, len] = line.split(" ").map((s) => parseInt(s));
                    applyToArr((arr) => arr.push({dest, src, len}))
                }
            }
        }
    );

// Process seeds


for (const seed of seeds){
    let seedSoil, seedFert, seedWater, seedLight, seedTemp, seedHumid, seedLocn;
    let min, max;

    for (const map of seedSoilMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seed >= min && seed <= max){
            seedSoil = map.dest + (seed - min)
        }
    }
    seedSoil = seedSoil || seed

    for (const map of soilFertMaps){
        min = map.src
        max = map.src +map.len - 1;

        if (seedSoil >= min && seedSoil <= max){
            seedFert = map.dest + (seedSoil - min)
        }
    }
    seedFert = seedFert || seedSoil

    for (const map of fertWaterMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seedFert >= min && seedFert <= max){
            seedWater = map.dest + (seedFert - min)
        }
    }
    seedWater = seedWater || seedFert

    for (const map of waterLightMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seedWater >= min && seedWater <= max){
            seedLight = map.dest + (seedWater - min)
        }
    }
    seedLight = seedLight || seedWater

    for (const map of lightTempMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seedLight >= min && seedLight <= max){
            seedTemp = map.dest + (seedLight - min)
        }
    }
    seedTemp = seedTemp || seedLight

    for (const map of tempHumidMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seedTemp >= min && seedTemp <= max){
            seedHumid = map.dest + (seedTemp - min)
        }
    }
    seedHumid = seedHumid || seedTemp

    for (const map of humidLocnMaps){
        min = map.src
        max = map.src + map.len - 1;

        if (seedHumid >= min && seedHumid <= max){
            seedLocn = map.dest + (seedHumid - min)
        }
    }
    seedLocn = seedLocn || seedHumid

    seedValues.push({seed, seedSoil, seedFert, seedWater, seedLight, seedHumid, seedTemp, seedHumid, seedLocn});
}

let locations = seedValues.map(m => m.seedLocn);
console.log(Math.min(...locations));