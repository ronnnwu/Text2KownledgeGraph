import React from 'react'
import { Graph } from "react-d3-graph";



export default class KGraph extends React.Component {
          
         myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: "lightgreen",
                size: 120,
                highlightStrokeColor: "blue",
            },
            link: {
                highlightColor: "lightblue",
                renderLabel: true
            },
            directed: true
        }; 

    render() {
        return  <Graph
        id="graph-id" // id is mandatory 
        data={{
            nodes: this.props.nodes,
            links: this.props.links
        }}
        config={this.myConfig} 
    />;

    }
  
}