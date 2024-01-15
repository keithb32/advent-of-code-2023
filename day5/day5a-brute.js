const fs = require('fs');
const FILE_PATH = './example.txt';

// Regex patterns
const seedNumPattern = /(?<=seeds: ).+/;
const headerPattern = /[a-z- ]+(?=:)/;
const srcDestLenPattern = /\d+ \d+ \d+/;

// Global variables
var header = "";
var seeds = [];
var seedSoilMap = {};
var soilFertMap = {};
var fertWaterMap = {};
var waterLightMap = {};
var lightTempMap = {};
var tempHumidMap = {};
var humidLocnMap = {};

// Helper functions
const applyToMap = (callback) => {
    if (header === 'seed-to-soil map'){
        callback(seedSoilMap);
    }
    else if (header === 'soil-to-fertilizer map'){
        callback(soilFertMap);
    }
    else if (header === 'fertilizer-to-water map'){
        callback(fertWaterMap);
    }
    else if (header === 'water-to-light map'){
        callback(waterLightMap);
    }
    else if (header === 'light-to-temperature map'){
        callback(lightTempMap);
    }
    else if (header === 'temperature-to-humidity map'){
        callback(tempHumidMap);
    }
    else if (header === 'humidity-to-location map'){
        callback(humidLocnMap);
    }
}

const fillMissing = (...maps) => {
    for (let i = 0; i < maps.length-1; i++){
        let srcMap = maps[i];
        let destMap = maps[i+1];
        for (const val of Object.values(srcMap)){
            if (!(val in destMap)){
                destMap[val] = val;
            }
        }
    }
}

const seedLocation = (seed) => {
    const soil = seedSoilMap[seed];
    const fert = soilFertMap[soil];
    const water = fertWaterMap[fert];
    const light = waterLightMap[water];
    const temp = lightTempMap[light];
    const humid = tempHumidMap[temp];
    const locn = humidLocnMap[humid];
    return locn;
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
                    for (let i = 0; i < len; i++){
                        applyToMap((map) => map[src+i] = dest+i);
                    }   
                }
            }
        }
    );

fillMissing(seeds, seedSoilMap, soilFertMap, fertWaterMap, waterLightMap, lightTempMap, tempHumidMap, humidLocnMap);

let locations = seeds.map((s) => seedLocation(s));
console.log(Math.min(...locations));

