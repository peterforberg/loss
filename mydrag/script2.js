// global variables
var nodes = 1;

// create function to deal with duplicates

// function to generate the network object based on the constructed HTML divs
function generateNetwork() {
var data = {nodes: [],links: []};
let rootNode = {
    id: 1,
    name: document.getElementById("rootName").innerText,
    weight: 0
}
data.nodes.push(rootNode);
for (i = 2; i < nodes; i++) {
    if (document.getElementById(i) != null) {
        if (!document.getElementById("name " + i).value) {
            var tempName = "";
        } else {
            var tempName = document.getElementById("name " + i).value;
        }
        if (!document.getElementById("weight " + i).value) {
            var tempWeight = 0;
        } else {
            var tempWeight = document.getElementById("weight " + i).value;
        }
        let node = {
            id: i,
            name: tempName,
            weight: tempWeight
        };
        data.nodes.push(node);
        if (document.getElementById(i).parentElement.id != null) {
            var tempSource = parseInt(document.getElementById(i).id);
            var tempTarget = parseInt(document.getElementById(i).parentElement.id);
            let link = {
                source: tempSource,
                target: tempTarget
            }
            data.links.push(link);
        }
    }
} 
console.log(data);
}
// function to create children nodes
function addNode(clicked_id) {
    let currentNode = document.getElementById(clicked_id);
    let parentDiv = currentNode.closest("div");
    let parentNum = parentDiv.parents;
    console.log(parentNum);
    nodes++;
    // console.log(currentNode);
    // console.log(parentDiv);
    // create a new div
    let newDiv = document.createElement("div");
    newDiv.className = "nodeContainer";
    newDiv.id = nodes;
    // create input to name nodes
    let newName = document.createElement("input");
    newName.id = "name " + nodes;
    let newNameName = "name " + nodes;
    newName.setAttribute("type","text");
    newName.setAttribute("name",newNameName);
    newName.setAttribute("placeholder","enter name");
    // create input to assign node colors
    let newColor = document.createElement("input");
    newColor.id = "color " + nodes;
    let newColorName = "name " + nodes;
    newColor.setAttribute("type","color");
    newColor.setAttribute("name",newColorName);
    // create input to assign nodes weight
    let newWeight = document.createElement("input");
    newWeight.id = "weight " + nodes;
    let newWeightName = "weight " + nodes;
    newWeight.setAttribute("type","text");
    newWeight.setAttribute("name",newWeightName);
    newWeight.setAttribute("placeholder","enter weight");
    // create button to add nodes
    let newNode = document.createElement("button");
    newNode.id = "node " + nodes;
    newNode.innerHTML = "+";
    newNode.setAttribute("onclick","addNode(this.id)");
    // create button to remove nodes
    let deleter = document.createElement("button");
    deleter.id = "delete " + nodes;
    deleter.innerHTML = "x";
    deleter.setAttribute("onclick","removeNode(this.id)");
    // append new children to div
    newDiv.appendChild(newName);
    newDiv.appendChild(newWeight);
    newDiv.appendChild(newColor);
    newDiv.appendChild(newNode);
    newDiv.appendChild(deleter);
    parentDiv.appendChild(newDiv);
}


// function to delete nodes
function removeNode(clicked_id) {
    let currentNode = document.getElementById(clicked_id);
    let parentDiv = currentNode.closest("div");
    let nodeNumber = parentDiv.childElementCount - 5;
    if (nodeNumber > 5) {
        let confirmation = confirm("This will delete " + nodeNumber + " nodes, are you sure you want to do this?");
        if (confirmation == true) {
            parentDiv.remove();
        }
    } else {
    parentDiv.remove();
    }
}

// chart = {
//     const links = data.links.map(d => Object.create(d));
//     const nodes = data.nodes.map(d => Object.create(d));
  
//     const simulation = d3.forceSimulation(nodes)
//         .force("link", d3.forceLink(links).id(d => d.id))
//         .force("charge", d3.forceManyBody())
//         .force("center", d3.forceCenter(width / 2, height / 2));
  
//     const svg = d3.create("svg")
//         .attr("viewBox", [0, 0, width, height]);
  
//     const link = svg.append("g")
//         .attr("stroke", "#999")
//         .attr("stroke-opacity", 0.6)
//       .selectAll("line")
//       .data(links)
//       .join("line")
//         .attr("stroke-width", d => Math.sqrt(d.value));
  
//     const node = svg.append("g")
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1.5)
//       .selectAll("circle")
//       .data(nodes)
//       .join("circle")
//         .attr("r", 5)
//         .attr("fill", color)
//         .call(drag(simulation));
  
//     node.append("title")
//         .text(d => d.id);
  
//     simulation.on("tick", () => {
//       link
//           .attr("x1", d => d.source.x)
//           .attr("y1", d => d.source.y)
//           .attr("x2", d => d.target.x)
//           .attr("y2", d => d.target.y);
  
//       node
//           .attr("cx", d => d.x)
//           .attr("cy", d => d.y);
//     });
  
//     invalidation.then(() => simulation.stop());
  
//     return svg.node();
//   }

// function to check children elements
// function checkChild(clicked_id) {
//     var parentNode = document.getElementById(clicked_id);
//     if (parentNode.hasChildNodes()) {
//         console.log("This node has children.")
//     } else {
//         console.log("This node is childless.")
//     }
// }

var svg = d3.select("svg");
  var width = svg.attr("width");
  var height = svg.attr("height");

// Call zoom for svg container.
svg.call(d3.zoom().on('zoom', zoomed));

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())//Or to use names rather than indices: .id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength([-120]).distanceMax([500]))
    .force("center", d3.forceCenter(width / 2, height / 2));

var container = svg.append('g');

// Create form for search (see function below).
var search = d3.select("body").append('form').attr('onsubmit', 'return false;');

var box = search.append('input')
	.attr('type', 'text')
	.attr('id', 'searchTerm')
	.attr('placeholder', 'Type to search...');

var button = search.append('input')
	.attr('type', 'button')
	.attr('value', 'Search')
	.on('click', function () { searchNodes(); });

// Toggle for ego networks on click (below).
var toggle = 0;


d3.json("marvel.json", function(error, graph) {
  if (error) throw error;

  // Make object of all neighboring nodes.
  var linkedByIndex = {};
  graph.links.forEach(function(d) {
	  linkedByIndex[d.source + ',' + d.target] = 1;
	  linkedByIndex[d.target + ',' + d.source] = 1;
  });

  // A function to test if two nodes are neighboring.
  function neighboring(a, b) {
	  return linkedByIndex[a.index + ',' + b.index];
  }

  // Linear scale for degree centrality.
  var degreeSize = d3.scaleLinear()
  	.domain([d3.min(graph.nodes, function(d) {return d.degree; }),d3.max(graph.nodes, function(d) {return d.degree; })])
  	.range([8,25]);

  // Collision detection based on degree centrality.
  simulation.force("collide", d3.forceCollide().radius( function (d) { return degreeSize(d.degree); }));

  var link = container.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links, function(d) { return d.source + ", " + d.target;})
    .enter().append("line")
      .attr('class', 'link');

  var node = container.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    // Calculate degree centrality within JavaScript.
    //.attr("r", function(d, i) { count = 0; graph.links.forEach(function(l) { if (l.source == i || l.target == i) { count += 1;}; }); return size(count);})
    // Use degree centrality from NetworkX in json.
    .attr('r', function(d, i) { return degreeSize(d.degree); })
    // Color by group, a result of modularity calculation in NetworkX.
      .attr("fill", function(d) { return color(d.group); })
      .attr('class', 'node')
      // On click, toggle ego networks for the selected node.
      .on('click', function(d, i) {
	      if (toggle == 0) {
		      // Ternary operator restyles links and nodes if they are adjacent.
		      d3.selectAll('.link').style('stroke-opacity', function (l) {
			      return l.target == d || l.source == d ? 1 : 0.1;
		      });
		      d3.selectAll('.node').style('opacity', function (n) {
			      return neighboring(d, n) ? 1 : 0.1;
		      });
		      d3.select(this).style('opacity', 1);
		      toggle = 1;
	      }
	      else {
		      // Restore nodes and links to normal opacity.
		      d3.selectAll('.link').style('stroke-opacity', '0.6');
		      d3.selectAll('.node').style('opacity', '1');
		      toggle = 0;
	      }
      })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.name; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  	// A slider (using only d3 and HTML5) that removes nodes below the input threshold.
	var slider = d3.select('body').append('p').text('Edge Weight Threshold: ');

	slider.append('label')
		.attr('for', 'threshold')
		.text('1');
	slider.append('input')
		.attr('type', 'range')
		.attr('min', d3.min(graph.links, function(d) {return d.weight; }))
		.attr('max', d3.max(graph.links, function(d) {return d.weight; }) / 2)
		.attr('value', d3.min(graph.links, function(d) {return d.weight; }))
		.attr('id', 'threshold')
		.style('width', '50%')
		.style('display', 'block')
		.on('input', function () { 
			var threshold = this.value;

			d3.select('label').text(threshold);

			// Find the links that are at or above the threshold.
			var newData = [];
			graph.links.forEach( function (d) {
				if (d.weight >= threshold) {newData.push(d); };
			});

			// Data join with only those new links.
			link = link.data(newData, function(d) {return d.source + ', ' + d.target;});
			link.exit().remove();
			var linkEnter = link.enter().append('line').attr('class', 'link');
			link = linkEnter.merge(link);

			node = node.data(graph.nodes);

			// Restart simulation with new link data.
			simulation
				.nodes(graph.nodes).on('tick', ticked)
				.force("link").links(newData);

			simulation.alphaTarget(0.1).restart();

		});

	// A dropdown menu with three different centrality measures, calculated in NetworkX.
	// Accounts for node collision.
	var dropdown = d3.select('body').append('div')
		.append('select')
		.on('change', function() { 
			var centrality = this.value;
			var centralitySize = d3.scaleLinear()
				.domain([d3.min(graph.nodes, function(d) { return d[centrality]; }), d3.max(graph.nodes, function(d) { return d[centrality]; })])
				.range([8,25]);
			node.attr('r', function(d) { return centralitySize(d[centrality]); } );  
			// Recalculate collision detection based on selected centrality.
			simulation.force("collide", d3.forceCollide().radius( function (d) { return centralitySize(d[centrality]); }));
			simulation.alphaTarget(0.1).restart();
		});

	dropdown.selectAll('option')
		.data(['Degree Centrality', 'Betweenness Centrality', 'Eigenvector Centrality'])
		.enter().append('option')
		.attr('value', function(d) { return d.split(' ')[0].toLowerCase(); })
		.text(function(d) { return d; });

});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Zooming function translates the size of the svg container.
function zoomed() {
	  container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
}

// Search for nodes by making all unmatched nodes temporarily transparent.
function searchNodes() {
	var term = document.getElementById('searchTerm').value;
	var selected = container.selectAll('.node').filter(function (d, i) {
		return d.name.toLowerCase().search(term.toLowerCase()) == -1;
	});
	selected.style('opacity', '0');
	var link = container.selectAll('.link');
	link.style('stroke-opacity', '0');
	d3.selectAll('.node').transition()
		.duration(5000)
		.style('opacity', '1');
	d3.selectAll('.link').transition().duration(5000).style('stroke-opacity', '0.6');
}