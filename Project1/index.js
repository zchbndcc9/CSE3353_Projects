const json = require('./airline_map.json');
const quicksort = require('./quicksort.js');

//Closest pair class

class ClosestPair {
    constructor(distance = Number.MAX_SAFE_INTEGER) {
        this.distance = distance;
        this.pair = [];
    }
    setPair(distance, pair) {
        this.distance = distance;
        this.pair = pair;
    }
}

// Helper functions

const distance = (plane1, plane2) => { //5
    let x = Math.pow(plane1.x - plane2.x, 2); //1
    let y = Math.pow(plane1.y - plane2.y, 2); //1
    let sum = x + y; //1
    return Math.abs(Math.sqrt(sum)); //1
};

// Brute Force algorithm 

const bruteSort = (planes, low = 0, high = planes.length) => {
    //Reset Closest Pair struct
    let cp = new ClosestPair(); //2

    if(high - 1 === low){
        cp.pair = [planes[low]]; //2
        return cp;
    }

    //Loop through all elements to find closest pair 
    for(let i = low; i < high - 1; i++) { // n
        for(let j = i + 1; j < high; j++) { //n-1
            let dist = distance(planes[i], planes[j]); //6
            if(dist < cp.distance) {
                cp.setPair(dist, [planes[i], planes[j]]); //2
            }
        }
    }
    return cp;
};

console.time('Brute Sort');
let result = bruteSort(json);
console.timeEnd('Brute Sort');

 /* This works as an exhaustive method to find the shortest distance between two
 points using an adapted form of the Pathagorean Theorem. This function
 calculates the distance for each pair of plane plots and stores the smallest
 calculated value within a variable within the function. Once the two nested
 loops have completed, the smallest possible distance will have been calculated.

 The time complexity of this exhaustive method is
 T(n) = 2 + 2 + n(n - 1 + 6 + 2)
 T(n) = 4 + n(n + 7)
 T(n) = n^2 + 7n + 4 ===> O(n^2)

 This means that the big-O for this function is O(n^2)
 */

const ySort = planes => {
    //Sort array according to y 
    quicksort(planes, (left, right) => left.y > right.y); //n*lg(n)

    return _ySort(planes);
};

const _ySort = (planes, low = 0, high = planes.length) => {
    //Create new closest pair object
    let cp = new ClosestPair(); //2

    //Loop through all elements to find closest pair
    for (let i = low; i < high - 1; i++) { //n
        let currPoint = planes[i].y; //1
        for (let j = i + 1; j < high && planes[j].y - currPoint < cp.distance; j++) { //lg(n)
            let dist = distance(planes[i], planes[j]); //6
            if (dist < cp.distance) {
                cp.setPair(dist, [planes[i], planes[j]]); //2
            }
        }
    }
    return cp;
};

console.time('Pre Sorting Y');
result = ySort(json);
console.timeEnd('Pre Sorting Y');

/*
T(n) = nlg(n) + 2 + n(1 + lg(n)(6 + 2))
T(n) = nlg(n) + 2 + n(1 + 8lg(n))
T(n) = 9nlg(n) + n + 2 ====> O(nlgn)

This algorithm is faster than the brute force method due to the screening of
potential pairs with the minimum distance calculated. By first sorting by Y,
this allows us to use the minimum distance (dmin) calculated between a pair
to act as a screening function. According to trigonomic theory, the distance
betweeen the current point and it's potentital pair MUST be less than or equal
to dmin in order for the pair to be considered a candidate for being the
closest pair. Once that minimum distance has been passed, the inner loop can
terminate and the primary loop can continue

10 elements:
    closestPair_Brute: 0.255ms
    closestPair_Ysort: 0.300ms
10,000 elements:
    closestPair_Brute: 345.561ms
    closestPair_Ysort: 19.213ms
100,000 elements:
    closestPair_Brute: 40170.853ms
    closestPair_Ysort: 56.864ms
*/

module.exports = {
    ClosestPair,
    distance,
    bruteSort
};