const fs = require('fs');
const traverse = require('./helpers');
const assert = require('assert');

function Decoder(data){

    let i = 0;

    function buildTree() {
      while(i < data.length) {
        if (data[i] === "1") {
            const leaf = {};
            leaf.character = data[++i];
            return leaf;
        } else {
            const tree = {};
            ++i;
            tree.left = buildTree();
            ++i;
            tree.right = buildTree();
            return tree;
        }
      }
    }

    function createTable(callback) {
        const tree = buildTree(),
        table = {};

        traverse(tree, function(currentNode, binary) {
            if (!currentNode.left) {
                table[binary] = currentNode.character;
            }
        });

        return table;
    }

    return {
        table: createTable(),
        begin: i + 2
    };
}

function decode(file_name, dest_name){
    const data = fs.readFileSync(file_name, "utf-8");
    const decoder = Decoder(data);

    let buffer = "";
    let charBuffer = "";

    for(let i = decoder.begin; i < data.length; i++){
        charBuffer += data[i];
        if(decoder.table[charBuffer]){
            buffer += decoder.table[charBuffer];
            charBuffer = "";
        }
    }
    //If assert works then that means that the uncompressed 
    //and decompressed files are equal
    assert.deepStrictEqual(buffer, fs.readFileSync("uncompressed.txt", "utf-8"));

    fs.writeFileSync(dest_name, buffer); 

}

if(!process.argv[2]) {
    console.error("Please specify the encoded file you would like to decode");
} else {
    let fileDestination = (!process.argv[3]) ? 'decoded.txt' : process.argv[3];
    decode(process.argv[2], fileDestination);
}