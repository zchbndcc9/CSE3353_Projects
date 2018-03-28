"use strict";

//Interacting with file system
const fs = require("fs");

//Instantiate chance
var Chance = require("chance");
var chance = new Chance();

chance.mixin({
  : function() {
    return {
      character: chance.character();
      x: chance.floating(options),
      y: chance.floating(options),
      heading: chance.integer({ min: 0, max: 360 })
    };
  }
});

fs.writeFileSync("uncompressed.txt", data);
