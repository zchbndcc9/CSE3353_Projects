function heapify(data, compareFxn = (left, right) => left < right) {
    const cmp = compareFxn;
    
    bubbleup = () => {
        for(let i = self.size; i >= 0; i --) {
            bubbledown(i);
        }
    };
    
    bubbledown = parent => {
        if(parent * 2 > self.size - 1) return;

        let leftChild = getLeftChild(parent);
        let rightChild = getRightChild(parent);

        let child = cmp(self.heap[leftChild], self.heap[rightChild]) ? leftChild : rightChild;

        if (cmp(self.heap[child], self.heap[parent])) {
          swap(child, parent);
          bubbledown(child);
        }
    };
    
    swap = (i, j) => {
        let tmp = self.heap[i];
        self.heap[i] = self.heap[j];
        self.heap[j] = tmp;
    };

    getLeftChild = index => index * 2;

    getRightChild = index => {
        let childIndex = index * 2 + 1;
        return childIndex < self.size ? childIndex : childIndex - 1;
        //Returns index of left child if there is no rightchild
    };

    pop = () => {
        if(self.size == 0) {
            console.log("Cannot pop from empty heap");
            return;
        }
        swap(0, self.size - 1);
        let result = self.heap.pop();
        self.size--;
        bubbledown(0);
        return result;
    };

    insert = member => {
        self.heap.push(member);
        self.size++;
        bubbleup();
    };

    let self = {
        heap: data.slice(),
        size: data.length,
        pop: () => pop(),
        insert: (member) => insert(member)
    };

    bubbleup();

    return self;
}

module.exports = heapify;