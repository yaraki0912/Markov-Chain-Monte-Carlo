'use strict';
/* eslint guard-for-in: 0 */
// const commandLineArgs = require('command-line-args');
/* eslint guard-for-in: 0 */
/* eslint no-unused-vars: 0 */
/* eslint capitalized-comments: 0 */
/* eslint max-params:0 */
// const commandLineArgs = require('command-line-args');
/* eslint linebreak-style: ["error", "windows"] */
/* tried to take in out from user but didnt work out :(
function input() {
  // Takes commandline input using command line args
  const optionDefinitions = [
    {
      // Number of nodes
      name: 'number',
      alias: 'n',
      type: Number,
      defaultValue: 5
    },
    {
      // Coordinate should be (x1,y1,x2,y2......)
      name: 'coordinate',
      alias: 'c',
      type: Array,
      defaultValue: [4, 3, 2, 5, 1, 0, 6, 1, 6, 7]
    }
  ];

  const options = commandLineArgs(optionDefinitions);
  return options;
}

const options = input();
var nnodes = options.nodeNumber; // Number of nodes
var coordinates = options.coordinates; // Coordinates of the nodes
*/

var jsnx = require('jsnetworkx');

class Graph {
  // Gives Graph functuins that can connect nodes and add edges and that can add coordinates
  constructor(nnodes) {
    this.nodes = nnodes;
    this.edges = Array(0);
    this.nodelocs = Array(nnodes);
  }

  connect(start, end) {
    this.edges.push([start, end]);
  }

  place(idx, x, y) {
    this.nodelocs[idx] = [x, y];
  }
}

function connectedNodes(graph, i, j, visited = []) {
  /**
   * This function determines if nodes i and j are connected in a graph
   * graph: object
   * i: number
   * j: number
   * visited: array
   */
  if (i === j) return true;
  for (let index = 0; index < graph.edges.length; index++) {
    const e = graph.edges[index];
    if ((e[0] === i && e[1] === j) || (e[1] === i && e[0] === j)) return true;
  }
  for (let index = 0; index < graph.edges.length; index++) {
    const e = graph.edges[index];
    if (
      e[0] === i &&
      !visited.reduce((pv, v) => {
        return pv || v === e[1];
      }, false)
    ) {
      if (connectedNodes(graph, e[1], j, visited.concat([i]))) return true;
    }
    if (
      e[1] === i &&
      // Map Reduce, check every node and see if it has been visited before.
      !visited.reduce((pv, v) => {
        return pv || v === e[0];
      }, false)
    ) {
      if (connectedNodes(graph, e[0], j, visited.concat([i]))) return true;
    }
  }
}

function connected(graph) {
  /**
   * This function determines if a graph is connected
   * If connected retuns true, otherwise fale
   */

  for (let i = 0; i < graph.nodes; i++) {
    for (let j = i + 1; j < graph.nodes; j++) {
      if (!connectedNodes(graph, i, j)) {
        return false;
      }
    }
  }
  return true;
}

function distance(graph, v1, v2) {
  /**
   * This function calculates the ditance between the nodes
   */
  let x1 = graph.nodelocs[v1][0];
  let x2 = graph.nodelocs[v2][0];
  let y1 = graph.nodelocs[v1][1];
  let y2 = graph.nodelocs[v2][1];
  var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return distance;
}

function weight(graph, r = 1) {
  /**
   * This function gives the weight of a network with parameter r
   * determining the relation between edge weight and path weight
   */
  // let G = jsnx.toNetworkxGraph(graph);
  /*var G = new jsnx.Graph();
  G.addNode(0, { Coord: graph.nodelocs[0] });
  for (let e = 0; e < graph.nodes; e++) {
    if (e < graph.nodes - 1) {
      graph.connect(
        0,
        e
      );
      graph.connect(
        e,
        e + 1
      );
      G.addNode(e, { Coord: graph.nodelocs[e] });
      const w = distance(graph.nodelocs[0], graph.nodelocs[e]);
      G.addWeightedEdgesFrom([[0, e, w]]);
      const w1 = distance(graph.nodelocs[e], graph.nodelocs[e + 1]);
      G.addWeightedEdgesFrom([[e, e + 1, w1]]);
    } else {
      graph.connect(
        e,
        0
      );
      G.addNode(e, { Coord: graph.nodelocs[e] });
      const w = distance(graph.nodeClocs[e], graph.nodelocs[0]);
      G.addWeightedEdgesFrom([[e, 0, w]]);
    }
  }
  G.removeEdge(0, 0);*/
  if (!connected(graph)) {
    return 100000;
  }
  let wte = 0;
  let wtp = 0;
  for (let i = 0; i < graph.edges.length; i++) {
    let v1 = graph.edges[i][0];
    let v2 = graph.edges[i][1];
    wte += distance(graph, v1, v2);
  }
  for (let i = 1; i < graph.nodes; i++) {
    wtp += Math.random() * 5;
    /* I am aware that this is not a right way to calculate weihted path
      however none of the commented out ways worked and I have decided not to spend
      too much time on this part. the commented out above code transfer graph to jsnx 
      anod i thought i should be able to use jsnx.dijkstraPathLength but it did not work
    */
    //wtp += jsnx.dijkstraPathLength(G, 0, 0);
    wtp += i;
  }
  let weight = wte * r + wtp;
  return weight;
}

function deleteEdge(graph) {
  /**
   * Function deletes a random edge from a graph
   * and return a new graph with out the random edge
   */

  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  let index = Math.floor(Math.random() * graph.edges.length);
  graph.edges.splice(index, 1);
  newGraph.edges = graph.edges;
  return newGraph;
}

function addEdge(graph) {
  /**
   * Function add a random edge to a graph
   * return new graph with added edge
   */

  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  newGraph.edges = graph.edges;
  let i = 0;
  while (i < 2000) {
    // Give it up to 1000 tries to find acceptable edge (prevents doubling existing edge)
    i += 1;
    // Grab two random nodes
    let m = Math.floor(Math.random() * newGraph.nodes);
    let n = Math.floor(Math.random() * newGraph.nodes);
    // If these aren't an edge and are distinct, accept the new edge and break
    let bad = false;
    if (m === n) {
      bad = true;
    }
    for (let j = 0; j < graph.edges.length; j++) {
      if (
        (m === graph.edges[j][0] && n === graph.edges[j][1]) ||
        (n === graph.edges[j][0] && m === graph.edges[j][1])
      ) {
        bad = true;
      }
    }
    if (!bad) {
      newGraph.connect(
        m,
        n
      );
      break;
    }
  }
  return newGraph;
}

/*not working
function swapEdge(graph) {
  /
    Function swaps two viable edges in a graph
   /
  const newGraph = new Graph(graph.nodes);
  newGraph.nodelocs = graph.nodelocs;
  let i = 0;
  while (i < 1000) {
    // Give it 1000 tries to find swap
    i += 1;
    let e1 = graph.edges[Math.floor(Math.random() * graph.edges.length)];
    let e2 = graph.edges[Math.floor(Math.random() * graph.edges.length)];
    if (new Set([e1[0], e1[1], e2[0], e2[1]]).size === 4) {
      // Edges don't share vertices (valid swap)
      for (let j = 0; j < graph.edges.length; j++) {
        if (notSwap(j, e1, e2)) {
          // The edge of graph is not a swap edge
          newGraph.edges.push(graph.edges[j]);
        }
      }
      newGraph.connect(
        e1[0],
        e2[0]
      );
      newGraph.connect(
        e1[1],
        e1[1]
      );
      break;
    }
  }
  return newGraph;

  function notSwap(j, e1, e2) {
    return !(
      [graph.edges[j][0], graph.edges[j][1]] === [e1[0], e1[1]] ||
      [graph.edges[j][0], graph.edges[j][1]] === [e2[0], e2[1]]
    );
  }
}
*/

function propose(oldGraph) {
  /**
   * Function proposes new graph by adding, deleting, or swapping edge
   */
  let roll = Math.random();
  if (roll < 0.5) {
    return deleteEdge(oldGraph);
  }
  
    return addEdge(oldGraph);
  
  //return swapEdge(oldGraph);
}

function accept(oldGraph, newGraph, T) {
  /**
   * Function decides whether or not to accept new graph based on relative goodness
   */

  let goodness = Math.exp(-(weight(newGraph) - weight(oldGraph)) / T);
  let rate = Math.min(1, goodness);
  //console.log(`rate ${rate}`);
  let roll = Math.random();
  //console.log(`roll ${roll}`);
  if (roll > rate) {
    return false;
  }
  return true;
}

function summary(graphList) {
  /**
   * Function iterates over list of graph objects to calculate summary statistics
   */
  let centerEdges = 0;
  let totalEdges = 0;
  let maxDists = 0;
  let totalGraphs = graphList.length;
  for (let g = 0; g < graphList.length; g++) {
    totalEdges += graphList[g].edges.length;
    for (let e = 0; e < graphList[g].edges.length; e++) {
      if (graphList[e].nodelocs[0] === 0 || graphList[e].nodelocs[1] === 0) {
        centerEdges += 1;
      }
    }
    let currMax = 0;
    for (let n = 0; n < graphList[n].nodelocs.length; n++) {
      let dist = distance(graphList[n], 0, n);
      if (dist > currMax) {
        currMax = dist;
      }
    }
  }
  let expectedCenterEdges = centerEdges / totalGraphs;
  let expectedEdges = totalEdges / totalGraphs;
  let expectedMaxDist = maxDists / totalGraphs;
  console.log(`Expected edges from source: ${expectedCenterEdges}`);
  console.log(`Expected edges in graph: ${expectedEdges}`);
  console.log(`Expected maximum distance from center: ${expectedMaxDist}`);
  console.log(totalGraphs);
  console.log(totalEdges);
  console.log(graphList[0]);
}

function runall(tries = 1000, T = 300) {
  /*
    This Function creats an intial graph based on the user input
    numNodes: number of nodes user input
    coordinate: coordinate of nodes user input
    G: each node is connected to the next node in the order user inputted 
    */
  let graph = new Graph(6);
  graph.place(0, 0, 0);
  graph.place(1, 4, 3);
  graph.place(2, 2, 5);
  graph.place(3, 1, 0);
  graph.place(4, 6, 1);
  graph.place(5, 6, 7);
  graph.connect(
    0,
    1
  );
  graph.connect(
    1,
    2
  );
  graph.connect(
    2,
    3
  );
  graph.connect(
    3,
    4
  );
  graph.connect(
    4,
    5
  );
  let oldGraph = graph;
  let graphList = [graph];
  for (let iter = 0; iter < tries; iter++) {
    let newGraph = propose(oldGraph);
    if (accept(oldGraph, newGraph, T)) {
      oldGraph = newGraph;
      graphList.push(oldGraph);
    } else {
      graphList.push(oldGraph);
    }
  }
  summary(graphList);
}
runall();

module.exports = {
  Graph,
  connected,
  distance,
  weight,
  deleteEdge,
  addEdge,
  propose,
  accept,
  summary,
  runall
};
