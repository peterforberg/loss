// global variables
var nodes = 1;
var data = { nodes: [], links: [] };
// create function to deal with duplicates

// function to generate the network object based on the constructed HTML divs
function generateNetwork() {

    let rootNode = {
        name: 1,
        name2: document.getElementById("rootName").innerText,
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
                name: i,
                name2: tempName,
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
    let svgDiv = document.createElement("svg");
    svgDiv.setAttribute("width", "600");
    svgDiv.setAttribute("height", "600");
    document.getElementById("graph").appendChild(svgDiv);
}

// function to generate svg
// function generatesvg() {
// var svg = d3.select("svg");
//     var width = svg.attr("width");
//     console.log(width);
//     var height = svg.attr("height");
//     console.log(height);

//     var simulation = d3
//         .forceSimulation(data.nodes)
//         .force(
//             "link",
//             d3
//                 .forceLink()
//                 .id(function (d) {
//                     return d.name;
//                 })
//                 .links(data.links)
//         )

//         .force("charge", d3.forceManyBody().strength(-30))
//         .force("center", d3.forceCenter(width / 2, height / 2))
//         .on("tick", ticked);

//     var link = svg
//         .append("g")
//         .attr("class", "links")
//         .selectAll("line")
//         .data(data.links)
//         .enter()
//         .append("line")
//         .attr("stroke-width", function (d) {
//             return 3;
//         });

//     var node = svg
//         .append("g")
//         .attr("class", "nodes")
//         .selectAll("circle")
//         .data(data.nodes)
//         .enter()
//         .append("circle")
//         .attr("r", 5)
//         .attr("fill", function (d) {
//             return "red";
//         })
//         .call(
//             d3
//                 .drag()
//                 .on("start", dragstarted)
//                 .on("drag", dragged)
//                 .on("end", dragended)
//         );

//     function ticked() {
//         link
//             .attr("x1", function (d) {
//                 return d.source.x;
//             })
//             .attr("y1", function (d) {
//                 return d.source.y;
//             })
//             .attr("x2", function (d) {
//                 return d.target.x;
//             })
//             .attr("y2", function (d) {
//                 return d.target.y;
//             });

//         node
//             .attr("cx", function (d) {
//                 return d.x;
//             })
//             .attr("cy", function (d) {
//                 return d.y;
//             });
//     }

//     function dragstarted(d) {
//         if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//     }

//     function dragged(d) {
//         d.fx = d3.event.x;
//         d.fy = d3.event.y;
//     }

//     function dragended(d) {
//         if (!d3.event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//     }
// }

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
    newName.setAttribute("type", "text");
    newName.setAttribute("name", newNameName);
    newName.setAttribute("placeholder", "enter name");
    // create input to assign node colors
    let newColor = document.createElement("input");
    newColor.id = "color " + nodes;
    let newColorName = "name " + nodes;
    newColor.setAttribute("type", "color");
    newColor.setAttribute("name", newColorName);
    // create input to assign nodes weight
    let newWeight = document.createElement("input");
    newWeight.id = "weight " + nodes;
    let newWeightName = "weight " + nodes;
    newWeight.setAttribute("type", "text");
    newWeight.setAttribute("name", newWeightName);
    newWeight.setAttribute("placeholder", "enter weight");
    // create button to add nodes
    let newNode = document.createElement("button");
    newNode.id = "node " + nodes;
    newNode.innerHTML = "+";
    newNode.setAttribute("onclick", "addNode(this.id)");
    // create button to remove nodes
    let deleter = document.createElement("button");
    deleter.id = "delete " + nodes;
    deleter.innerHTML = "x";
    deleter.setAttribute("onclick", "removeNode(this.id)");
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

// function to generate svg
