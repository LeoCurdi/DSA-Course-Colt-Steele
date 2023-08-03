
class PriorityQueue {

    constructor() {
        // model the queue using an array
        this.values = []
    }

    // we're sorting every time we insert a new node. this is a naive solution and we could make it better with a heap
    // inserting here is o(NlogN) and a heap would be o(logN)
    enqueue(value, priority) {
        this.values.push({value, priority})
        this.sort()
    }

    dequeue() {
        return this.values.shift()
    }

    // sorting is o(N*logN)
    sort() {
        this.values.sort((a, b) => a.priority - b.priority)
    }
}
