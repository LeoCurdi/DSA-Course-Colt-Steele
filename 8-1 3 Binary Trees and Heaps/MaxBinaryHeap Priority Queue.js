
// nodes will be stored in an array
// were using nodes for the priority queue so we can store value and priority
class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

/* 
    Were using a MIN heap here, so priority 1 is more important than priority 3
*/
class PriorityQueue {

    constructor(){
        // all we need is an array of nodes
        this.values = [];
    }

    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    // move a newly inserted value up to its correct position
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        // keep going until new value reaches the top (or finds a parent that has smaller priority)
        while(idx > 0){
            // find parent
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            // if parent priority is less, stop bubbling up
            if(element.priority >= parent.priority) break;
            // else swap the values
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    // after removing the root of the heap and replacing it with the last element in the array,
    // sink the element down to where it belongs
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        // get index of both children
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;
            // if left child exists
            if(leftChildIdx < length){
                // get value of left child
                leftChild = this.values[leftChildIdx];
                // if left child has smaller priority than element
                if(leftChild.priority < element.priority) {
                    // mark it for a swap
                    swap = leftChildIdx;
                }
            }
            // if right child exists
            if(rightChildIdx < length){
                // get value of right child
                rightChild = this.values[rightChildIdx];
                // if right child has smaller priority than element and has smaller priority than left child
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    // mark it for a swap
                    swap = rightChildIdx;
                }
            }
            // if neither child is eligible for swap
            if(swap === null) break;
            // else swap with the selected child
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

let ER = new PriorityQueue();
ER.enqueue("common cold",5)
ER.enqueue("gunshot wound", 1)
ER.enqueue("high fever",4)
ER.enqueue("broken arm",2)
ER.enqueue("glass in foot",3)






