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

console.log(closestPair_Brute(json));

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

const quickSort = (array, fxn) => {
    
    
}

const partition = function(arr, i, j, fxn) {
    let mid = (i + j)/2;

    

}
 const closestPair_dc = planes => {
    //Sort array according to y
    quicksort(planes, (left, right) => {
        return (left[y] > right[y]) ? true : false;
    })
    //
    
    //conquer
 }