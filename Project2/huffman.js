const heapify = require('./min-heap');
const traverse = require('./helpers')

function isMinHeap(tree){
    let bool = false;
    traverse(tree, function(currentNode) {
        if(currentNode.left) {
            if(currentNode.left.frequency > currentNode.frequency){
                bool = false;
            }
        }
        if(currentNode.right) {
            if(currentNode.right.frequency > currentNode.frequency){
                bool = false;
            }
        } 
    });

    return bool;
}

function huffman(data) {
    function createTree(data) {
        let heap = heapify(data, (left, right) => left.frequency < right.frequency);
        let n = heap.size;
    
        for (let i = 1; i < n; i++) {
            let node = {};
            node.left = heap.pop();
            node.right = heap.pop();
            node.frequency = node.left.frequency + node.right.frequency;
            heap.insert(node);
        }
        return heap.pop();
    }

    let tree = createTree(data);
    return tree;
}

module.exports = huffman;