
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
