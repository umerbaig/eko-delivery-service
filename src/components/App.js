import React from 'react';
import { Graph } from 'react-d3-graph';
import { seedGraphData, Graph as DirectedGraph } from '../utils/graph';
import DeliveryCostTab from './Tabs/DeliveryCostTab';
import DeliveryRoutesTab from './Tabs/DeliveryRoutesTab';
import AddRoutesTab from './Tabs/AddLinksTab';
import './App.css';

const graph = new DirectedGraph(seedGraphData); // Example data for graph

function App() {
  const [activeTab, setTab] = React.useState(0);
  const [links, setLinks] = React.useState(graph.getLinks());

  return (
    <div className="app">
      <header className="app__header">
        <button
          className={activeTab === 0 ? 'app__header--active' : ''}
          onClick={() => setTab(0)}
        >
          Delivery Cost
        </button>
        <button 
          className={activeTab === 1 ? 'app__header--active' : ''}
          onClick={() => setTab(1)}
        >
          Possible Delivery Routes
        </button>
        <button 
          className={activeTab === 2 ? 'app__header--active' : ''}
          onClick={() => setTab(2)}
        >
          Add More Routes
        </button>
      </header>

      <div className="app__content">
        <section className="app__tab-content">
          <div>
            {activeTab === 0 && <DeliveryCostTab graph={graph} />}
            {activeTab === 1 && <DeliveryRoutesTab graph={graph} />}
            {activeTab === 2 && (
              <AddRoutesTab
                onNodeAdded={() => {
                  // Update the state
                  setLinks(graph.getLinks());
                }}
                graph={graph}
              />
            )}
          </div>
        </section>

        <section className="app__routes-tree">
          <Graph
            id="tree-routes"
            data={{
              nodes: graph.getNodes().map((node) => ({id: node})),
              links,
            }}
            config={{
              directed: true,
              d3: {
                linkLength: 300,
              },
              height: 500,
              link: {
                fontSize: 12,
                fontWeight: 'bold',
                renderLabel: true,
                type: 'STRAIGHT',
                color: 'black',
                strokeWidth: 2,
              },
              node: {
                color: 'black',
                strokeWidth: 8,
                strokeColor: '#29cb72',
                fontSize: 15,
                fontWeight: 'bold',
                size: 700,
              },
            }}
          />
        </section>
      </div>

    </div>
  );
}

export default App;