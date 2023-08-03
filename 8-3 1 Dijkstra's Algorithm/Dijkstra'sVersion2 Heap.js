
class Node {
    constructor(value, priority) {
        this.value = value
        this.priority = priority
    }
}

/* 
    this time we're implementing the q with a heap. (o(logN) for bubbleup vs o(NlogN)) for sort
    Were using a MIN heap here, so priority 1 is more important than priority 3
*/
class PriorityQueue {

    constructor() {
        // all we need is an array of nodes
        this.values = []
    }

    // inserts a new element to the heap
    enqueue(value, priority) {
        // create a new node
        let newNode = new Node(value, priority)
        // push the value to the array
        this.values.push(newNode)
        // heapify the heap so the new value gets where it needs to go 
        // (we cant have children that are bigger than parents)
        this.bubbleUp()
    }

    // move a newly inserted value up to its correct position
    bubbleUp() {
        let index = this.values.length - 1
        const element = this.values[index]
        // keep going until new value reaches the top (or finds a parent that has smaller priority)
        while (index > 0) {
            // find parent
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.values[parentIndex]
            // if parent priority is less, stop bubbling up
            if (element.priority >= parent.priority) break
            // else swap the values
            this.values[parentIndex] = element
            this.values[index] = parent
            index = parentIndex
        }
    }

    // delete the root element in the heap
    dequeue() {
        // select root and end element
        const min = this.values[0]
        const end = this.values.pop() // remove end element
        // if not empty
        if (this.values.length > 0) {
            // move end element to root
            this.values[0] = end;
            // sink element down to the correct spot
            this.sinkDown()
        }
        return min
    }

    // after removing the root of the heap and replacing it with the last element in the array,
    // sink the element down to where it belongs
    sinkDown() {
        let index = 0
        const length = this.values.length
        const element = this.values[0]
        while (true) {
            // get index of both children
            let leftChildIndex = 2 * index + 1
            let rightChildIndex = 2 * index + 2
            let leftChild, rightChild
            let swap = null
            // if left child exists
            if (leftChildIndex < length) {
                // get value of left child
                leftChild = this.values[leftChildIndex]
                // if left child has smaller priority than element
                if (leftChild.priority < element.priority) {
                    // mark it for a swap
                    swap = leftChildIndex
                }
            }
            // if right child exists
            if (rightChildIndex < length) {
                // get value of right child
                rightChild = this.values[rightChildIndex]
                // if right child has smaller priority than element and has smaller priority than left child
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    // mark it for a swap
                    swap = rightChildIndex
                }
            }
            // if neither child is eligible for swap
            if (swap === null) break
            // else swap with the selected child
            this.values[index] = this.values[swap]
            this.values[swap] = element
            index = swap
        }
    }
}


class WeightedGraph {
    
    constructor() {
        // using a list vs a matrix
        this.adjacencyList = {}
    }
    
    // add vertex
    addVertex(vertex) {
        // if the vertex doesnt already exist
        if (!this.adjacencyList[vertex]) {
            // add a key to the list and set its value to an empty array
            this.adjacencyList[vertex] = []
        }
    }

    // add edge - we need to add weight of edge here as well
    addEdge(vertex1, vertex2, weight) {
        // since the graph is undirected, add a connection from v1 to v2 and v2 to v1
        this.adjacencyList[vertex1].push({node: vertex2, weight}) // each connection will be stored in its own object
        this.adjacencyList[vertex2].push({node: vertex1, weight})
    }

    // Dijkstra's algorithm!
    dijkstra(start, finish) {
        const queue = new PriorityQueue() // initialize a q
        const distances = {} // keep track of shortest distance to each node from start
        const previous = {} // keep track of how to get to each node on the shortest path
        let path = [] // result
        let smallest
        // build up initial distances (set all to infinity, so they can be overwritten by shorter distances)
        // loop over the entire adjacency list
        for (let vertex in this.adjacencyList) {
            // we can set the starting vertex to 0 distance since we know the shortest path from start to start is 0
            if (vertex === start) {
                distances[vertex] = 0
                // start the queueing process with the initial vertex
                queue.enqueue(vertex, 0)
            }
            // set all other vertexes' distances to infinity
            else {
                distances[vertex] = Infinity
                // queue all of the vertexes
                queue.enqueue(vertex, Infinity)
            }
            // set all prev's to null since we havent found a path to get to any of the nodes yet
            previous[vertex] = null
        }
        // traverse through the entire queue
        while (queue.values.length) {
            // visit the closest node to start
            smallest = queue.dequeue().value
            // if smallest = finish, we've reached the end of the queue and have found the shortest path
            if (smallest === finish) {
                // record the path
                while (previous[smallest]) { // while were not back to start (the only node with no previous)
                    // add the previous node to the path
                    path.push(smallest) 
                    // go to the previous node so we can get the path to its prevous
                    smallest = previous[smallest]
                }
                // we're done!
                break
            }
            // else, loop through each value in the adjacency list at smallest vertex
            /* 
                the first part of this contional is error handling, and the second part is checking if a node has been visited - if it has not been visited 
                the distance will be infinity and there won't be a path to it, if there is a path to it we should go to it and explore it's neighbors
            */
            if (smallest || distances[smallest] !== Infinity) {
                // loop through each value in the adjacency list at smallest vertex
                for (let neighbor in this.adjacencyList[smallest]) {
                    // put neighbor in a variable for better looking code
                    let curNeighbor = this.adjacencyList[smallest][neighbor]
                    // calculate the distance to the neighbor from start
                    let newDistance = distances[smallest] + curNeighbor.weight
                    let nextNeighbor = curNeighbor.node
                    // if the calculated distance is less than the currently stored distance
                    if (newDistance < distances[nextNeighbor]) {
                        // update distance to neighbor
                        distances[nextNeighbor] = newDistance
                        // update the path to neighbor
                        previous[nextNeighbor] = smallest
                        // queue up the neighbor with the new shorter distance
                        queue.enqueue(nextNeighbor, newDistance)
                    }
                }
            }
        }
        // return the shortest path (we have to reverse it bc it's currently from finish to start)
        return path.concat(smallest).reverse()
    }
}


var graph = new WeightedGraph()
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A","B", 4);
graph.addEdge("A","C", 2);
graph.addEdge("B","E", 3);
graph.addEdge("C","D", 2);
graph.addEdge("C","F", 4);
graph.addEdge("D","E", 3);
graph.addEdge("D","F", 1);
graph.addEdge("E","F", 1);


graph.Dijkstra("A", "E");

//       A
//     2/ \4
//     C   B
//     |\2 |
//    4| D |3
//     |/ \|    <- 1/ \3
//     F---E
//       1

// Shortest path from A to E:
// ["A", "C", "D", "F", "E"]

