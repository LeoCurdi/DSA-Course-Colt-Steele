
/* 
    there are 2 main ways of storing edges and vertices in a graph:
    - adjacency matrix: a 2D structure usually implemented with arrays where we store rows and columns
    - adjacency list: a list (usually a hash table) of pairs of vertices that are connected. ex: a-b is [a,b], b-a is [b,a]
    We're gonna use a list bc less space, and real world data tends to have much less than the max amount of edges
*/

// this will be an undirected graph
// Note: we have no error handling - it is just bare bones functionality. we could add some basic error handling pretty easy by just checking if stuff exists etc
class Graph {

    constructor() {
        this.adjacencyList = {}
        // using a list + undirected which looks like: a-b is a: [b], b: [a]
    }

    // add vertex
    addVertex(vertex) {
        // if the vertex doesnt already exist
        if (!this.adjacencyList[vertex]) {
            // add a key to the list and set its value to an empty array
            this.adjacencyList[vertex] = []
        }
    }

    // add edge
    addEdge(v1, v2) {
        // since the graph is undirected, add a connection from v1 to v2 and v2 to v1
        this.adjacencyList[v1].push(v2)
        this.adjacencyList[v2].push(v1)
    }

    // remove edge
    removeEdge(v1, v2) {
        // since graph is undirected, remove connection in both directions
        // we can use filter to easily remove the correct connection without deleting the whole array
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2) // copy over all unless it's the one we dont want to keep
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1)
    }

    // remove vertex
    removeVertex(vertex) {
        // iterate until all connections involved with the vertex are deleted
        while (this.adjacencyList[vertex].length) {
            // get the vertex on the other side of the last listed connection, and pop off this side of connection simultaniously
            const adjacentVertex = this.adjacencyList[vertex].pop()
            // remove connection on other side
            this.removeEdge(vertex, adjacentVertex)
        }
        // the above code could be done with a for loop as well
/*         for (let i = 0; i < this.adjacencyList[vertex].length; i++) {
            this.removeEdge(vertex, this.adjacencyList[vertex][i])
        } */
        // delete the vertex entirely (not necessarily required)
        delete this.adjacencyList[vertex]
    }


// Traversal

    // dfs recursive
    depthFirstRecursive(start) {
        const result = [] // the list of nodes in the order they are encountered
        const visited = {} // track all visited nodes
        // get out of using 'this' inside the helper function, because the context inside the helper function is different so 'this' refers to something else
        const adjacencyList = this.adjacencyList 
        // recursive helper function
        function helper(vertex) {
            // base case - vertex is empty: end call
            if (!vertex) return null
            // mark vertex as visited
            visited[vertex] = true
            // add vertex to results list
            result.push(vertex)
            // for each of the vertex's neighbors
            adjacencyList[vertex].forEach(neighbor => {
                // if the neighbor has not been visited
                if (!visited[neighbor]) {
                    // recursively call on neighbor
                    return helper(neighbor)
                }
            })
        }
        // call the helper 
        helper(start)
        // return the result
        return result
    }

    // dfs iterative - using a stack
    depthFirstIterative(start) {
        // instead of using the call stack to track where we've been and are going, we'll use a stack. 
        // this is essentially a recursion replacement. order will be different though
        const stack = [start] // start with the start queued up in the stack (using an array instead of our own class)
        const result = [] // the list of nodes in the order they are encountered
        const visited = {} // track all visited nodes
        let currentVertex // track current vertex
        visited[start] = true // start is visited immediately
        // iterate until we've exhausted the stack
        while (stack.length) {
            // pop the vertex off the stack and grab it
            currentVertex = stack.pop()
            // add it to the result list
            result.push(currentVertex)
            // for each of the vertex's neighbors
            this.adjacencyList[currentVertex].forEach(neighbor => { // Note: we can still use 'this' here
                // if the neighbor has not been visited
                if (!visited[neighbor]) {
                    // mark it as visited
                    visited[neighbor] = true
                    // queue it up in the stack to be processed
                    stack.push(neighbor)
                }
            })
        }
        // return the result
        return result
    }

    // bfs - using a queue (iterative. if you tried doing it recursively it would end up being a depth first)
    breadthFirst(start) {
        // we will q up all neighbors, then process current node, then repeat.
        // this will give us breadth first order
        const queue = [start] // use an array (not efficient!), and queue up the root
        const result = [] // the list of nodes in the order they are encountered
        const visited = {} // track all visited nodes
        let currentVertex // track current vertex
        visited[start] = true // start is visited immediately
        // iterate until we've exhausted the queue
        while (queue.length) {
            // grab the current node in the queue and dequeue it
            currentVertex = queue.shift()
            // save it to the result list
            result.push(currentVertex)
            // for each of the vertex's neighbors
            this.adjacencyList[currentVertex].forEach(neighbor => { // Note: we can still use 'this' here
                // if the neighbor has not been visited
                if (!visited[neighbor]) {
                    // mark it as visited
                    visited[neighbor] = true
                    // queue it up to be processed
                    queue.push(neighbor)
                }
            })
        }
        // return the result
        return result
    }
}


let g = new Graph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B","D")
g.addEdge("C","E")
g.addEdge("D","E")
g.addEdge("D","F")
g.addEdge("E","F")

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

// dfsr: [A,B,D,E,C,F]
// dfsi: [A,C,E,F,D,B]
// bfs:  [A,B,C,D,E,F]

