const util = require('./index.js');
const json = require('./airline_map.json');
const quicksort = require('./quicksort.js');

function subarray(sortedX, sortedY, cp = null) { //5
    return {
        sortedX: sortedX,
        sortedY: sortedY,
        cp: cp,
        length: sortedX.length,
        last: sortedX[sortedX.length - 1]
    };
}

const _initializePlaneObj = planes => { //2nlg(n) + 2n + 7
    let planesX, planesY; //2
    planesX = planes.slice(); //n
    planesY = planes.slice(); //n

    quicksort(planesX, (left, right) => left.x > right.x); //nlg(n)
    quicksort(planesY, (left, right) => left.y > right.y); //nlg(n)

    return subarray(planesX, planesY); //5
};

const _divide = P => { //2n + 11 
    //Divide P into Q and R
    let mid = Math.floor(P.length/2); //1
    let leftY = _findYElements(P.sortedY, Number.MIN_SAFE_INTEGER, P.sortedX[mid].x); //n
    let rightY = _findYElements(P.sortedY, P.sortedX[mid].x); //n
    let Q = subarray(P.sortedX.slice(0,mid), leftY); //5
    let R = subarray(P.sortedX.slice(mid), rightY); //5
    //include x and y sorted arrays

    return {
        left: Q,
        right: R
    };
};

//Finds y elements that are within xSorted in order to partition P correctly
const _findYElements = (Py, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
    return Py.filter(element => element.x < max && element.x >= min); //n
};

const _recombine = (Q, R) => { //14n + 11
    //Recombine sorted arrays
    let xArr = Q.sortedX.concat(R.sortedX); //n
    let yArr = Q.sortedY.concat(R.sortedY); //n
    let mid = Q.sortedX[Q.length-1]; //1
    let P = subarray(xArr, yArr); //5
    //Set closest Pair
    let main_cp = (Q.cp.distance > R.cp.distance) ? R.cp : Q.cp; //1
    //Linear search of Y 
    let strip_cp = _stripSearch(P, mid, main_cp); //11n + 3
    //Find closestPair in strip
    P.cp = (strip_cp.distance > main_cp.distance) ? main_cp : strip_cp; //1
    return P;
};

const _stripSearch = (P, mid, main_cp) => { //11n + 3
    //Loop through the sorted Y array to find distances <= main
    //closest pair distance
    let strip = []; //1
    let strip_cp = new util.ClosestPair(); //2

    for (let i of P.sortedY) { //n
        if (Math.abs(i.x - mid.x) <= main_cp.distance) { //1
            strip.push(i); //1
        }
    }

    for (let i = 0; i < strip.length - 1; i++) { //n
        let currPoint = strip[i].y; //1
        for (let j = i + 1; j < strip.length && j - i < 15; j++) { //1
            let dist = util.distance(strip[i], strip[j]); //5
            if (dist < strip_cp.distance) {
                strip_cp.setPair(dist, [strip[i], strip[j]]); //2
            }
        }
    }

    return strip_cp;
};

const _willCollide = closestPair => { //25 ===> constant
    let plane1, plane2;
    plane1 = _calculateVectorComponents(closestPair.pair[0]); //4
    plane2 = _calculateVectorComponents(closestPair.pair[1]); //4
    let dx = plane2.start.x - plane1.start.x; //2
    let dy = plane2.start.y - plane1.start.y; //2
    let det = (plane1.direction.y * plane2.direction.x) - (plane1.direction.x * plane2.direction.y); //3
    
    //If determinant is 0 it means that the two rays are parallel and do not intercept
    if (det === 0) {
        return false;
    }
    
    let u = (dy * (plane2.direction.x) - dx * plane2.direction.y)/det; //5
    let v = (dy * (plane1.direction.x) - dx * plane1.direction.y)/det; //5
    
    return (u*v > 0) ? true : false;
};

const _calculateVectorComponents = plane => { //4
    //Magnitude
    let m = Math.sqrt(Math.pow(plane.x, 2) + Math.pow(plane.y, 2)); //4
    return {
        start: {x: plane.x, y: plane.y},
        direction: {x: m*Math.cos(plane.heading), y: m*Math.sin(plane.heading)}
    };
};  

const _closestPair_DandC = P => { //16n + 23
    //Base case
    if (P.length < 4) {
        P.cp = util.bruteSort(P.sortedX); //1, since it is only done when n < 4
        return P; //1
    }
    //Divide, splits array into equal parts 
    P = _divide(P); //2n + 11

    let Q = _closestPair_DandC(P.left);
    let R = _closestPair_DandC(P.right);

    //Recombine P
    return _recombine(Q, R); //14n + 11
};

const closestPair_DandC = planes => { //2nlg(n) + 18n + 30
    planes = _initializePlaneObj(planes); //2nlg(n) + 2n + 7

    let result = _closestPair_DandC(planes); //16n + 23

    return result.cp;
};
    
console.time('Divide and Conquer');
result = closestPair_DandC(json);
console.timeEnd('Divide and Conquer');
console.log(result);
if (_willCollide(result)) console.log('Watch out! You are going to crash');

/* This algorithm works by initially sorting the planes array by both x and y,
which enables the recursion to progress without having to sort after each
divide step. By breaking down the array into smaller arrays, the work becomes
dispersed over all of the leaves. Once a closest pair has been determined on
each half of the initial array, P, the closest pair between the two halfs must
be determined before working back up the recursion. By doing so, we are able to
see if there are any more candidates for the closest pair. Much like with the
ySort in part 2, by using a y-sorted array in the strip pair, we are able to
cut the loop iterations by half. 

For the divide and conquer the T(n) will equal:
T(n) = 2T(n/2) + (2nlg(n) + 18n + 30) =====> O(nlg(n))

When determining a collision path for the planes with the closest distance, I
used a vector determinant in order to see if the vectors would cross paths at
any point. By using a starting position vector along side a direction vector, I
was able to determine if the planes would be on a collision course. Since this
algorithm is not dependent on n, the run time is constant 
*/
