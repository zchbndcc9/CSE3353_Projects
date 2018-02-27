// Helper functions

const swap = (arr, i, j) => {
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
};

//Returns index of median
const median3 = (arr, low, high, compareFxn = (left, right) => left > right) => {
    let mid = Math.floor((high + low)/ 2);

    if(compareFxn(arr[high], arr[low])){
        return (compareFxn(arr[low], arr[mid])) ? low : mid;
    } else {
        return (compareFxn(arr[mid], arr[high])) ? mid : high;
    }
};

// Quicksort definitions

const quickSort = (arr, compareFxn = (left, right) => left > right) => {
        return _quickSort(arr, 0, arr.length - 1, compareFxn);
};

const _quickSort = (arr, low, high, compareFxn) => {
    if (low > high)
        return;

    let part = _partition(arr, low, high, compareFxn);
    _quickSort(arr, low, part - 1, compareFxn);
    _quickSort(arr, part + 1, high, compareFxn);
};

const _partition = (arr, low, high, compareFxn) => {
    //Instatiate pivot value
    let pivIndex = median3(arr, low, high, compareFxn);
    swap(arr, pivIndex, high);

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
};

module.exports = quickSort;