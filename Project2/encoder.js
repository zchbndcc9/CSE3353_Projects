const huffman = require('./huffman.js');
const processFile = require('./text-processor');
const traverse = require('./helpers');
const fs = require('fs');

function Encoder(data){
    let encodedTree = "",
    table = {},
    tree = huffman(data);

    traverse(tree, function(currentNode, binary) {
        //Guard edgecase incase there is only one character in the file
        if (binary.length === 0) binary = 1;
        
        if (!currentNode.left) {
            encodedTree += `1${currentNode.character}`;
            table[currentNode.character] = binary;
        } else {
            encodedTree += "0";
        }
    });
    
    //Insert STX char used for termination of reading encodedTree
    encodedTree += '\2';

    return {
        tree: encodedTree,
        table
    };
}

function encode(file_name) {
    const file = processFile(file_name);  
    const encoder = Encoder(file.charFreq);
    
    let encodedData = "";

    for(let i of file.data){
        encodedData += encoder.table[i];
    }
    
    fs.writeFileSync('./encoded.txt', encoder.tree + encodedData);
}

//Main
if(!process.argv[2]) {
    console.error('Please specify the file you would like to encode');
} else {
    encode(process.argv[2]);
}
