export const seedGraphData = {
  A: {
    B: 1,
    C: 4,
    D: 10,
  },
  B: {
    E: 3,
  },
  C: {
    D: 4,
    F: 2,
  },
  D: {
    E: 1,
  },
  E: {
    B: 3,
    A: 2,
  },
  F: {
    D: 1,
  }
}

/**
 * Calculates the possible routes using recursion and returns as concated string
 * The 2 routes are separated by ; and a route and cost is separated by =
 * So it looks like e.g ABCD=20;ASEE=12
 * If the route doesn't exist, it returns empty string
 * @param {String} start - Start node
 * @param {String} end -  End node 
 * @param {Object} graph - Flat graph object
 * @param {String} visitRoute - Stores the routes explored under source and target
 * @param {String} count - Counts the cost for the route under recursion 
 * @returns {String}
 */
function getPossiblePaths(start, end, graph, visitRoute = '', count = 0) {
  const edges = graph[start];

  if (visitRoute && start === end) {
    // We found the path
    return visitRoute + end + '=' + count;
  }

  if (!edges) {
    // deadend
    return '';
  }
  
  if (visitRoute.indexOf(visitRoute[visitRoute.length - 1] + start) >= 0) {
    // already visited route; we don't allow since it'll go in infiinte cycle
    return '';
  } 

  visitRoute += start;

  return Object.keys(edges).map((node) => {
    // No 0 cost routes should be included as per requirements
    if (edges[node] === 0) {
      return '';
    }

    const route = getPossiblePaths(node, end, graph, visitRoute, count + edges[node]);
    
    return route;
  }).filter((empty) => !!empty).join(';'); // Filter the routes (empty str) which had deadend
}

/**
 * Calculates the possible routes and returns as array sorted by cost
 * If the route doesn't exist, it returns empty array
 * @param {String} source 
 * @param {String} target 
 * @param {Object} graph 
 * @returns {Array<{route: String, cost: Number}}
 */
function calculatePossibleRoutes(source, target, graph) {
  const pathsStr = getPossiblePaths(source, target, graph); 

  if (!pathsStr) {
    return [];
  }

  // Since the string would be e.g ABE=20;CDE=10, we need to split it
  return pathsStr.split(';').map((pathWithCost) => {
    const arr = pathWithCost.split('=');
    return {route: arr[0], cost: parseInt(arr[1])};
  }).sort((left, right) => left.cost - right.cost)
}

/**
 * Calculates the cost of the route given as string
 * The route is in the form of e.g ABED.
 * If the route doesn't exist, it returns NaN
 * @param {String} path 
 * @returns {Number}
 */
function calculateRouteCost(path, graph) {
  let cost = 0;

  for (let i = 1; i < path.length; i ++) {
    const start = path[i - 1];    
    const end = path[i];

    const routeCost = graph[start][end]

    if (!routeCost) {
      return NaN;
    }
    
    cost += routeCost;
  }

  return cost;
}

/**
 * Takes a flat graph object and returns all possible links which can be
 * derived from graph
 * @param {Object}} graph 
 * @returns {Array<{source: string, target: string, label: number}>}
 */
function getGraphLinks(graph) {
  return Object.keys(graph).reduce((links, node) => {
    return links.concat(Object.keys(graph[node]).map((target) => ({
      source: node, target, label: graph[node][target]
    })));
  }, [])
}

/**
 * Takes a flat graph object and returns all nodes of graph
 * @param {Object}} graph 
 * @returns {Array<string>}
 */
function getGraphNodes(graph) {
  return Object.keys(graph);
}

export function Graph(flatGraph = {}) {
  this.flatGraph = {...flatGraph}
  this.getLinks = () => getGraphLinks(this.flatGraph);
  this.getNodes = () => getGraphNodes(this.flatGraph);
  this.calculatePossibleRoutes = (start, end) => calculatePossibleRoutes(start, end, this.flatGraph);
  this.calculateRouteCost = (path) => calculateRouteCost(path, this.flatGraph);
  this.setOnChange = (fn) => this.onChange = fn;
  this.addLink = (source, target, cost) => {
    // If it exists; override, otherwise create the node
    this.flatGraph[source] = {
      ...(this.flatGraph[source] || {}),
      [target]: cost,
    };
    
    // If target which is added doesn't exist, add it
    if (!this.flatGraph[target]) {
      this.flatGraph[target] = {};
    }
  }
}