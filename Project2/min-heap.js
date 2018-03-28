function heapify(data) {

    bubbleup = () => {
        for(let i = heap.length; i >= 0; i --) {
            bubbledown(i);
        }
    };
    
    bubbledown = parent => {
        if(parent * 2 > heap.length) return;

        let leftChild = getLeftChild(parent);
        let rightChild = getRightChild(parent);

        let child = heap[leftChild] < heap[rightChild] ? leftChild : rightChild;

        if (heap[child] < heap[parent]) {
          swap(child, parent);
          bubbledown(child);
        }
    };
    
    swap = (i, j) => {
        let tmp = heap[i];
        heap[i] = heap[j];
        heap[j] = tmp;
    };

    getLeftChild = index => index * 2;

    getRightChild = index => {
        let childIndex = index * 2 + 1;
        return childIndex < heap.length ? childIndex : childIndex - 1;
        //Returns index of left child if there is no rightchild
    };

    let heap = data.slice();
    
    bubbleup();

    return heap;
}