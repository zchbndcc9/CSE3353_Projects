const fs = require('fs');
const heapify = require('./min-heap');

const createCharObj = (key,value) => ({character: key, frequency: value});

function tabulate(file_data) {
    const collection = {};
    const charFreq = [];

    //Create table from data frequencies
    for (let i of file_data) {
        collection[i] === undefined ? (collection[i] = 1) : (collection[i] += 1);
    }

    //Create character objects according to guidelines established in 
    //project pdf:
    // {
    //     character: ...
    //     frequency: ...
    // }

    for (const [key, value] of Object.entries(collection)) {
        charFreq.push(createCharObj(key, value));
    }
    
    return charFreq;
}

function processFile(file_name) {
    //Read in all data into variable
    let data = fs.readFileSync(file_name, "utf8");

    return {
        data,
        charFreq: tabulate(data)
    };
}

module.exports = processFile;