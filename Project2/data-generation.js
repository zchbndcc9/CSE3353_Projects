"use strict";

//Interacting with file system
const fs = require("fs");

//Instantiate chance
const Chance = require("chance");
const chance = new Chance();

const options = {
    length: 30000,
    pool: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
};

chance.mixin({
    text: function(options) {
        if(!options.length) options.length = 10;

        let text = "";
        for(let i = 0; i < options.length; i++){
            text += chance.weighted(options.pool, [1, 2, 3, 4, 5, 6, 7]),
            text += chance.weighted(['', '. ',' ','? ', '! ', '\n'], [200, 1, 40, 1, 1, 1]);
        }

        return text;
    }
});

let file_name = !process.argv[2] ? "uncompressed.txt" : process.argv[2];
fs.writeFileSync(file_name, chance.text(options));
