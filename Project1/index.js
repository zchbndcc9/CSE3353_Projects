const json = require('./airline_map.json');

//Brute force algorithm 
const calculatePathag = (plane1, plane2) => {
    let x = (plane1.x - plane2.x) ** 2; //n
    let y = (plane1.y - plane2.y) ** 2; //n
    let sum = x + y; //n
    return Math.abs(Math.sqrt(sum)); //2n
}
const closestPair_Brute = planes => {
    //Instantiate smallest size
    let closestPair = {
        value: Number.MAX_SAFE_INTEGER,
        pair: []
    }
    //Loop through all elements to find closest pair
    for(let i = 0; i < planes.length; i++) { //n
        for(let j = i + 1; j < planes.length; j++) { //(n - 1) + (n - 2) + ... + 2 + 1 => n
            let pathag = calculatePathag(planes[i], planes[j]); //n
            if(pathag < closestPair.value) {
                closestPair.value = pathag;
                closestPair.pair = [planes[i], planes[j]];
            }
        }
    }
    return closestPair;
}

//console.log(closestPair_Brute(json));

// {
//     value: 0.35113639799940993,
//     pair:
//     [{ flightNumber: 'YK2641', x: 0.5317, y: 0.9598 }, 
//      { flightNumber: 'VB8856', x: 0.8223, y: 0.7627 }]
// }

 /* This works as an exhaustive method to find the shortest distance between two
 points using an adapted form of the Pathagorean Theorem. This function
 calculates the distance for each pair of plane plots and stores the smallest
 calculated value within a variable within the function. Once the two nested
 loops have completed, the smallest possible distance will have been calculated.

 The time complexity of this exhaustive method is */

const swap = function(arr, i, j) {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

const _quickSort = function(arr, low, high, compareFxn) {
    if (low > high)
        return;

    let part = _partition(arr, low, high, compareFxn);
    _quickSort(arr, low, part - 1, compareFxn);
    _quickSort(arr, part + 1, high, compareFxn);
}

const _partition = function(arr, low, high, compareFxn) {
    //Instatiate pivot value
    swap(arr, Math.floor((low + high)/2), high);

    let pivot, left;
    pivot = arr[high];
    left = low;

    for(let i = low; i < high; i++) {
        if(compareFxn(pivot, arr[i])) { //left[y] > right[y]
            swap(arr, i, left++);
        }
    }
    swap(arr, high, left);
    return left;
}

const quickSort = (arr, compareFxn = (left, right) => left > right) => {
    return _quickSort(arr, 0, arr.length - 1, compareFxn);
}

 const closestPair_dc = planes => {
    //Sort array according to y
    quickSort(planes, (left, right) => left.y > right.y);
    console.log(planes);
    //conquer
 }

closestPair_dc(json);