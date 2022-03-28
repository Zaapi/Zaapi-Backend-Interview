const express = require("express");
const Graph  = require("../utils/graph");
const router = express.Router();

let g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addVertex("G");

g.addEdge("A", "C");
g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("B", "G");


const bfs = function (graph, start) {
    console.log("GRAPH: ", graph);
    //A Queue to manage the nodes that have yet to be visited
    var queue = [];
    //Adding the node to start from
    queue.push(start);
    //A boolean array indicating whether we have already visited a node
    var visited = [];
    //(The start node is already visited)
    visited[start] = true;
    // Keeping the distances (might not be necessary depending on your use case)
    var distances = []; // No need to set initial values since every node is visted exactly once
    //(the distance to the start node is 0)
    distances[start] = 0;
    //While there are nodes left to visit...
    while (queue.length > 0) {
        console.log("Visited nodes: " + visited);
        console.log("Distances: " + distances);
        var node = queue.shift();
        console.log("Removing node " + node + " from the queue...");
        //...for all neighboring nodes that haven't been visited yet....
        for (var i = 1; i < graph.vertices.length; i++) {
            if (graph.vertices[i] && !visited[i]) {
                // Do whatever you want to do with the node here.
                // Visit it, set the distance and add it to the queue
                visited[i] = true;
                distances[i] = distances[node] + 1;
                queue.push(i);
                console.log("Visiting node " + i + ", setting its distance to " + distances[i] + " and adding it to the queue");

            }
        }
    }
    console.log("No more nodes in the queue. Distances: " + distances);
    return distances;
};


router.get("/", (req, res) => {
    const { start } = req.body;
    const bfsResult = bfs(g, start);
    res.status(200).send(`bfs is ${JSON.stringify(bfsResult)}`);
  });

module.exports = router;