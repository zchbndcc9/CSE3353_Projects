const json = require('./airline_map.json');
const quicksort = require('./quicksort.js');

//Closest pair class

class ClosestPair {
    constructor() {
        this.distance = Number.MAX_SAFE_INTEGER;
        this.pair = [];
    }
    setPair(distance, pair) {
        this.distance = distance;
        this.pair = pair;
    }
};

// Helper functions

const distance = (plane1, plane2) => {
    let x = (plane1.x - plane2.x) ** 2; //n
    let y = (plane1.y - plane2.y) ** 2; //n
    let sum = x + y; //n
    return Math.abs(Math.sqrt(sum)); //2n
}

// Brute Force algorithm 

const closestPair_Brute = (planes, low = 0, high = planes.length) => {
    //Reset Closest Pair struct
    let cp = new ClosestPair();

    //Loop through all elements to find closest pair
    for(let i = low; i < high; i++) { //n
        for(let j = i + 1; j < high; j++) { //(n - 1) + (n - 2) + ... + 2 + 1 => n
            let dist = distance(planes[i], planes[j]); //n
            if(dist < cp.distance) {
                cp.setPair(dist, [planes[i], planes[j]]);
            }
        }
    }
    return cp;
}
console.time('closestPair_Brute');
let result = closestPair_Brute(json);
console.timeEnd('closestPair_Brute');
console.log(result);

 /* This works as an exhaustive method to find the shortest distance between two
 points using an adapted form of the Pathagorean Theorem. This function
 calculates the distance for each pair of plane plots and stores the smallest
 calculated value within a variable within the function. Once the two nested
 loops have completed, the smallest possible distance will have been calculated.

 The time complexity of this exhaustive method is */


const closestPair_Ysort = (planes, low = 0, high = planes.length) => {
    //Sort array according to y
    quicksort(planes, (left, right) => left.y > right.y);

    //Create new closest pair object
    let cp = new ClosestPair();

    //Loop through all elements to find closest pair
    for (let i = 0; i < planes.length; i++) { //n
        let currPoint = planes[i].y;
        for (let j = i + 1; j < planes.length && planes[j].y - currPoint < cp.distance; j++) {
            let dist = distance(planes[i], planes[j]); //n
            if (dist < cp.distance) {
                cp.setPair(dist, [planes[i], planes[j]]);
            }
        }
    }
    return cp;
}

console.time('closestPair_Ysort');
result = closestPair_Ysort(json);
console.timeEnd('closestPair_Ysort');
console.log(result);

/**/ 

const closestPair_Recur = planes => {
    //Sort array according to x
    quicksort(planes, (left, right) => left.x > right.x);
   
    let main_pair = findMinDist(planes, 0, planes.length - 1);

    let mid = Math.floor(planes.length/2);
    let strip = [];
    let low, high;
    
    for(let i of planes) {
        if(Math.abs(i.x) - mid < main_pair.value){
            strip.push(i);
        }
    }

    let strip_pair = closestPair_Ysort(strip);
    return (main_pair.value > strip_pair.value) ? strip_pair : main_pair;


}

const findMinDist = (planes, low, high) => {
    let mid = Math.floor((low+high)/2);

    if(high - low < 4) {
        return closestPair_Brute(plane, low, high);
    }

    let pair1 = _closestPair_Recur(planes, low, mid);
    let pair2 = _closestPair_Recur(planes, mid+1, high); 
    
    return(pair1.value > pair2.value ? pair2 : pair1);
}
