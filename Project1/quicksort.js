var quickSort {
    quickSort: function(arr, compareFxn = (left, right) => left > right) => {
        return _quickSort(arr, 0, arr.length - 1, compareFxn);
    },
    

}
const _quickSort = (arr, low, high, compareFxn) => {
    if (low > high)
        return;

    let part = _partition(arr, low, high, compareFxn);
    _quickSort(arr, low, part - 1, compareFxn);
    _quickSort(arr, part + 1, high, compareFxn);
}

const _partition = (arr, low, high, compareFxn) => {
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

exports.data = quickSort;