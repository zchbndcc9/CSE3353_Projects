module.exports.heapify = function(data) {

    bubbleup = () => {
        for(let i = self.heap.length; i >= 0; i --) {
            bubbledown(i);
        }
    };
    
    bubbledown = parent => {
        if(parent * 2 > self.heap.length) return;

        let leftChild = getLeftChild(parent);
        let rightChild = getRightChild(parent);

        let child = self.heap[leftChild] < self.heap[rightChild] ? leftChild : rightChild;

        if (self.heap[child] < self.heap[parent]) {
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
        return childIndex < self.heap.length ? childIndex : childIndex - 1;
        //Returns index of left child if there is no rightchild
    };

    pop = () => {
        if(self.heap.length == 0) {
            console.log("Cannot pop from empty self.heap");
            return;
        }
        swap(0, self.heap.length - 1);
        let result = self.heap.pop();
        return result;
    }

    insert = member => {
        self.heap.push(member);
        bubbleup();
    };

    let self = {
        heap: data.slice(),
        pop: pop,
        insert: insert
    };

    bubbleup();

    return self;
}