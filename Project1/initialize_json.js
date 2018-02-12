"use strict";

//Interacting with file system
const fs = require('fs');

//Instantiate chance
var Chance = require('chance');
var chance = new Chance();

const options = {
    min: -10,
    max: 10,
    fixed: 4
}

chance.mixin({
    "flight": function(){
        return {
            "flightNumber": 
                chance.string({ length: 2, alpha: true, casing: 'upper' }) 
                + chance.pad(chance.integer({ min: 0, max: 9999 }), 4, 0),
            "x": chance.floating(options),
            "y": chance.floating(options)
        };
    }
})

let flights = []
for(let i = 0; i < 100; i++){
    //Name
    flights.push(chance.flight());
}

let data = JSON.stringify(flights, null, 2);
fs.writeFileSync('airline_map.json', data);
