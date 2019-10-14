import {Graph} from './graph';

const graphSeed = {
  A: {
    B: 2,
    C: 3,
  },
  B: {
    C: 9,
  },
  C: {
    B: 5,
    A: 1,
  }
}

it('should return empty nodes array if graph not initialised', () => {
  expect(new Graph().getNodes()).toEqual([]);
});

it('should return empty links array if graph not initialised', () => {
  expect(new Graph().getLinks()).toEqual([]);
})

it('should get the nodes of graph', () => {
  const graph = new Graph(graphSeed);
  expect(graph.getNodes()).toEqual(['A', 'B', 'C']);
})

it('should get the links of graph', () => {
  const graph = new Graph({A: { B: 2 }, B: { A: 3 }});
  expect(graph.getLinks())
    .toEqual([
      {source: 'A', target: 'B', label: 2},
      {source: 'B', target: 'A', label: 3},
    ]);
})

it('should get cost of ABC correctly', () => {
  const graph = new Graph(graphSeed);
  expect(graph.calculateRouteCost('ABC')).toEqual(11);
});

it('should return NaN if route doesnt exist', () => {
  const graph = new Graph(graphSeed);
  expect(graph.calculateRouteCost('ABe')).toEqual(NaN);
  expect(graph.calculateRouteCost('ABE')).toEqual(NaN);
});

it('should add the new route', () => {
  const graph = new Graph(graphSeed);
  graph.addLink('A', 'D', 3);
  expect(graph.getNodes().indexOf('D') >= 0).toBeTruthy();
  expect(graph.calculateRouteCost('AD')).toEqual(3);
});

it('should override the already existing route', () => {
  const graph = new Graph(graphSeed);
  graph.addLink('A', 'B', 100);
  expect(graph.calculateRouteCost('AB')).toEqual(100);
});

it('should get the possible route between A and A correctly', () => {
  const graph = new Graph(graphSeed);
  const routes = graph.calculatePossibleRoutes('A', 'A');
  expect(routes.length).toEqual(3);
  expect(routes[0].cost).toEqual(4);
});