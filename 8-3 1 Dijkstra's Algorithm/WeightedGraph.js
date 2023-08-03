
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
}

