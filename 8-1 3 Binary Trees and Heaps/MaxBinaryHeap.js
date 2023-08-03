
class MaxBinaryHeap {

    constructor(){
        // all we need is an array of values
        this.values = [];
    }

    // inserts a new element to the heap
    insert(element){
        // push the value to the array
        this.values.push(element);
        // heapify the heap so the new value gets where it needs to go 
        // (we cant have children that are bigger than parents)
        this.bubbleUp();
    }

    // move a newly inserted value up to its correct position
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        // keep going until new value reaches the top (or finds a parent that is bigger)
        while(idx > 0){
            // find parent
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            // if parent is bigger, stop bubbling up
            if(element <= parent) break;
            // else swap the values
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    // delete the root element in the heap
    removeMax(){
        // select root and end element
        const max = this.values[0];
        const end = this.values.pop(); // remove end element
        // if not empty
        if(this.values.length > 0){
            // move end element to root
            this.values[0] = end;
            // sink element down to the correct spot
            this.sinkDown();
        }
        return max;
    }

    // after removing the root of the heap and replacing it with the last element in the array,
    // sink the element down to where it belongs
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            // get index of both children
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;
            // if left child exists
            if(leftChildIdx < length){
                // get value of left child
                leftChild = this.values[leftChildIdx];
                // if left child is larger than element
                if(leftChild > element) {
                    // mark it for a swap
                    swap = leftChildIdx;
                }
            }
            // if right chuld exists
            if(rightChildIdx < length){
                // get value of right child
                rightChild = this.values[rightChildIdx];
                // if right child is larger than element and larger than left child
                if(
                    (swap === null && rightChild > element) || 
                    (swap !== null && rightChild > leftChild)
                ) {
                    // mark it for a swap
                    swap = rightChildIdx;
                }
            }
            // if neither child is eligible for swap
            if(swap === null) break;
            // else swap with the greater child
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

let heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);



