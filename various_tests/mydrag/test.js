  main.variable(observer("chart")).define("chart", ["data","d3","width","height","color","drag","invalidation"], function(data,d3,width,height,color,drag,invalidation)
{
  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map(d => Object.create(d));
  console.log(links);
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", color)
      .call(drag(simulation));

  node.append("title")
      .text(d => d.id);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}
);
  main.variable(observer("data")).define("data", function(){return(
{
  "nodes": [
    {
      "id": 1,
      "name": "parent node",
      "weight": 0
    },
    {
      "id": 2,
      "name": "",
      "weight": 0
    },
    {
      "id": 3,
      "name": "",
      "weight": 0
    },
    {
      "id": 4,
      "name": "",
      "weight": 0
    },
    {
      "id": 5,
      "name": "",
      "weight": 0
    },
    {
      "id": 6,
      "name": "",
      "weight": 0
    },
    {
      "id": 7,
      "name": "",
      "weight": 0
    },
    {
      "id": 8,
      "name": "",
      "weight": 0
    },
    {
      "id": 9,
      "name": "",
      "weight": 0
    },
    {
      "id": 10,
      "name": "",
      "weight": 0
    },
    {
      "id": 11,
      "name": "",
      "weight": 0
    },
    {
      "id": 12,
      "name": "",
      "weight": 0
    },
    {
      "id": 13,
      "name": "",
      "weight": 0
    },
    {
      "id": 14,
      "name": "",
      "weight": 0
    },
    {
      "id": 15,
      "name": "",
      "weight": 0
    },
    {
      "id": 16,
      "name": "",
      "weight": 0
    },
    {
      "id": 17,
      "name": "",
      "weight": 0
    },
    {
      "id": 18,
      "name": "",
      "weight": 0
    },
    {
      "id": 19,
      "name": "",
      "weight": 0
    },
    {
      "id": 20,
      "name": "",
      "weight": 0
    },
    {
      "id": 21,
      "name": "",
      "weight": 0
    },
    {
      "id": 22,
      "name": "",
      "weight": 0
    },
    {
      "id": 23,
      "name": "",
      "weight": 0
    },
    {
      "id": 24,
      "name": "",
      "weight": 0
    },
    {
      "id": 25,
      "name": "",
      "weight": 0
    },
    {
      "id": 26,
      "name": "",
      "weight": 0
    },
    {
      "id": 27,
      "name": "",
      "weight": 0
    }
  ],
  "links": [
    {
      "source": 2,
      "target": 1
    },
    {
      "source": 3,
      "target": 2
    },
    {
      "source": 4,
      "target": 3
    },
    {
      "source": 5,
      "target": 3
    },
    {
      "source": 6,
      "target": 3
    },
    {
      "source": 7,
      "target": 3
    },
    {
      "source": 8,
      "target": 3
    },
    {
      "source": 9,
      "target": 3
    },
    {
      "source": 10,
      "target": 3
    },
    {
      "source": 11,
      "target": 3
    },
    {
      "source": 12,
      "target": 7
    },
    {
      "source": 13,
      "target": 7
    },
    {
      "source": 14,
      "target": 7
    },
    {
      "source": 15,
      "target": 7
    },
    {
      "source": 16,
      "target": 7
    },
    {
      "source": 17,
      "target": 1
    },
    {
      "source": 18,
      "target": 1
    },
    {
      "source": 19,
      "target": 1
    },
    {
      "source": 20,
      "target": 1
    },
    {
      "source": 21,
      "target": 1
    },
    {
      "source": 22,
      "target": 18
    },
    {
      "source": 23,
      "target": 18
    },
    {
      "source": 24,
      "target": 18
    },
    {
      "source": 25,
      "target": 18
    },
    {
      "source": 26,
      "target": 19
    },
    {
      "source": 27,
      "target": 19
    }
  ]
}
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3)
{
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return d => scale(d.group);
}
);
  main.variable(observer("drag")).define("drag", ["d3"], function(d3){return(
simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});

