// global variables
if (window.location.pathname == "/lose.html") {
    var nodes = 1;
} else {
    var nodes = 4;
}

var data = { nodes: [], links: [] };
var node_names = [];

// Function to generate the network object (or the data) based on the constructed HTML divs
function generateNetwork() {
    data = { nodes: [], links: [] };
    node_names = [];
    for (i = 1; i <= nodes; i++) {
        if (i == 1) {
            var tempSourceName = document.getElementById("name " + i).value;
            let link = {
                source: tempSourceName,
                target: tempSourceName,
                identity: i
            }
            data.links.push(link);
        } else if (document.getElementById(i) != null && document.getElementById(i).parentElement.id != null) {
            var tempSourceName = document.getElementById("name " + i).value;
            var tempTargetId = parseInt(document.getElementById(i).parentElement.id);
            var tempTargetName = document.getElementById("name " + tempTargetId).value;
            let link = {
                source: tempSourceName,
                target: tempTargetName,
                identity: i
            }
            data.links.push(link);
        }
        if (document.getElementById("name " + i) != null) {
            var tempSourceName = document.getElementById("name " + i).value;
            var tempSourceColor = document.getElementById("color " + i).value;
            if (parseFloat(document.getElementById("smallB " + i).style.opacity) > .5) {
                var tempSourceSize = 5;
            } else if (parseFloat(document.getElementById("mediumB " + i).style.opacity) > .5) {
                var tempSourceSize = 10;
            } else {
                var tempSourceSize = 20;
            }
        }
        if (!node_names.includes(tempSourceName)) {
            node_names.push(tempSourceName);

            let node = {
                name: tempSourceName,
                color: tempSourceColor,
                size: tempSourceSize
            };
            data.nodes.push(node);
        }
    }
    console.log(data)
    var data_export = data;

    if (!document.getElementById("svgid")) {

        d3.select("#graph").append("svg").attr("width", 600).attr("height", 600).attr("id", "svgid");
    } else {
        let oldSVG = document.getElementById("svgid");
        oldSVG.remove();
        d3.select("#graph").append("svg").attr("width", 600).attr("height", 600).attr("id", "svgid");
    }
    return data;
}

function generatesvg() {
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.name).distance(50))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(300, 300));

    const svg = d3.select("#svgid");

    const links = svg.selectAll("line")
                    .data(data.links)
                    .enter()
                    .append("line")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2);

    var drag = d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);


                    var labelledNodes = svg
                    .append("g")
                    .selectAll("g")
                    .data(data.nodes)
                    .enter()
                    .append("g")
                    .call(drag);
                
                var nodes = labelledNodes
                    .append("circle")
                    .attr("r", d => d.size)
                    .attr("fill", d => d.color);
                
                var texts = labelledNodes
                    .append("text")
                    .text(d => d.name)
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("stroke-width", 3)
                    .clone(true)
                    .attr("stroke", "black")
                    .attr("stroke-width", .5)
                    .attr("fill", "black");
    
    simulation.on('tick', () => {
            labelledNodes.attr("transform", function(d) {
                return "translate(" + d.x + ", " + d.y +")";
            }); 

            labelledNodes
               .attr("cx", d => d.x)
               .attr("cy", d => d.y);
            
            links
               .attr("x1", d => d.source.x)
               .attr("y1", d => d.source.y)
               .attr("x2", d => d.target.x)
               .attr("y2", d => d.target.y)
        });

    function dragstarted(event, d) {
            //your alpha hit 0 it stops! make it run again
            simulation.alphaTarget(0.3).restart();
            d.fx = event.x;
            d.fy = event.y;
        }
    function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
    
    function dragended(event, d) {
            // alpha min is 0, head there
            simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
}
// function to create children nodes
function addNode(clicked_id) {
    let currentNode = document.getElementById(clicked_id);
    let nodeID = clicked_id.slice(5);
    // console.log(nodeID);
    // console.log(currentNode);
    let parentDiv = currentNode.closest(".nodeContainer");
    // console.log("parent div:")
    // console.log(parentDiv);
    let parentColor = document.getElementById("color " + nodeID).value;
    // console.log(parentColor);
    let parentNum = parentDiv.parents;
    nodes++;
    // console.log(currentNode);
    // console.log(parentDiv);
    // create a new div with class nodeContainer
    let newDiv = document.createElement("div");
    newDiv.className = "nodeContainer";
    newDiv.id = nodes;
    newDiv.setAttribute("ondrop", "drop(event)");
    newDiv.setAttribute("ondragover", "allowDrop(event)");
    newDiv.setAttribute("draggable", "true");
    newDiv.setAttribute("ondragstart", "drag(event)");
    // create a new div with class nodeStyle
    let newStyleDiv = document.createElement("div");
    newStyleDiv.className = "nodeStyle";
    newStyleDiv.setAttribute("draggable", "true");
    // create input to name nodes
    let newName = document.createElement("input");
    newName.id = "name " + nodes;
    let newNameName = "name " + nodes;
    newName.setAttribute("type", "text");
    newName.setAttribute("name", newNameName);
    newName.setAttribute("placeholder", "enter name");
    // create input to give nodes a size
    let sizeBS = document.createElement("button");
    sizeBS.id = "smallB " + nodes;
    sizeBS.style.height = "12px";
    sizeBS.style.width = "12px";
    sizeBS.style.borderRadius = "6px";
    sizeBS.style.backgroundColor = "black";
    sizeBS.style.opacity = "0.5";
    sizeBS.style.border = "0";
    sizeBS.style.outline = "none";
    sizeBS.setAttribute("onclick", "smallB(this.id)")
    let sizeBM = document.createElement("button");
    sizeBM.id = "mediumB " + nodes;
    sizeBM.style.height = "16px";
    sizeBM.style.width = "16px";
    sizeBM.style.borderRadius = "8px";
    sizeBM.style.backgroundColor = "black";
    sizeBM.style.opacity = "1";
    sizeBM.style.border = "0";
    sizeBM.style.outline = "none";
    sizeBM.setAttribute("onclick", "mediumB(this.id)")
    let sizeBL = document.createElement("button");
    sizeBL.id = "largeB " + nodes;
    sizeBL.style.height = "20px";
    sizeBL.style.width = "20px";
    sizeBL.style.borderRadius = "10px";
    sizeBL.style.backgroundColor = "black";
    sizeBL.style.opacity = "0.5";
    sizeBL.style.border = "0";
    sizeBL.style.outline = "none";
    sizeBL.setAttribute("onclick", "largeB(this.id)")
    // create input to assign node colors
    let newColor = document.createElement("input");
    newColor.id = "color " + nodes;
    let newColorName = "name " + nodes;
    newColor.setAttribute("type", "color");
    newColor.setAttribute("name", newColorName);
    newColor.setAttribute("value", parentColor);
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
    newStyleDiv.appendChild(newName);
    newStyleDiv.appendChild(sizeBS);
    newStyleDiv.appendChild(sizeBM);
    newStyleDiv.appendChild(sizeBL);
    newStyleDiv.appendChild(newColor);
    newStyleDiv.appendChild(newNode);
    newStyleDiv.appendChild(deleter);
    newDiv.appendChild(newStyleDiv);
    parentDiv.appendChild(newDiv);
}

// function to delete nodes
function removeNode(clicked_id) {
    let currentNode = document.getElementById(clicked_id);
    let parentDiv = currentNode.closest(".nodeContainer");
    let nodeNumber = Math.floor((parentDiv.querySelectorAll("*").length + 1) / 9);
    if (parentDiv.id == 1 && nodeNumber < 6) {
        parentDiv.remove();
        nodes = 1;
        let newDiv = document.createElement("div");
    newDiv.className = "nodeContainer";
    newDiv.id = nodes;
    newDiv.setAttribute("ondrop", "drop(event)");
    newDiv.setAttribute("ondragover", "allowDrop(event)");
    newDiv.setAttribute("draggable", "true");
    newDiv.setAttribute("ondragstart", "drag(event)");
    // create a new div with class nodeStyle
    let newStyleDiv = document.createElement("div");
    newStyleDiv.className = "nodeStyle";
    newStyleDiv.setAttribute("draggable", "true");
    // create input to name nodes
    let newName = document.createElement("input");
    newName.id = "name " + nodes;
    let newNameName = "name " + nodes;
    newName.setAttribute("type", "text");
    newName.setAttribute("name", newNameName);
    newName.setAttribute("placeholder", "enter name");
    // create input to give nodes a size
    let sizeBS = document.createElement("button");
    sizeBS.id = "smallB " + nodes;
    sizeBS.style.height = "12px";
    sizeBS.style.width = "12px";
    sizeBS.style.borderRadius = "6px";
    sizeBS.style.backgroundColor = "black";
    sizeBS.style.opacity = "0.5";
    sizeBS.style.border = "0";
    sizeBS.style.outline = "none";
    sizeBS.setAttribute("onclick", "smallB(this.id)")
    let sizeBM = document.createElement("button");
    sizeBM.id = "mediumB " + nodes;
    sizeBM.style.height = "16px";
    sizeBM.style.width = "16px";
    sizeBM.style.borderRadius = "8px";
    sizeBM.style.backgroundColor = "black";
    sizeBM.style.opacity = "1";
    sizeBM.style.border = "0";
    sizeBM.style.outline = "none";
    sizeBM.setAttribute("onclick", "mediumB(this.id)")
    let sizeBL = document.createElement("button");
    sizeBL.id = "largeB " + nodes;
    sizeBL.style.height = "20px";
    sizeBL.style.width = "20px";
    sizeBL.style.borderRadius = "10px";
    sizeBL.style.backgroundColor = "black";
    sizeBL.style.opacity = "0.5";
    sizeBL.style.border = "0";
    sizeBL.style.outline = "none";
    sizeBL.setAttribute("onclick", "largeB(this.id)")
    // create input to assign node colors
    let newColor = document.createElement("input");
    newColor.id = "color " + nodes;
    let newColorName = "name " + nodes;
    newColor.setAttribute("type", "color");
    newColor.setAttribute("name", newColorName);
    newColor.setAttribute("value", "#A70C0C");
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
    newStyleDiv.appendChild(newName);
    newStyleDiv.appendChild(sizeBS);
    newStyleDiv.appendChild(sizeBM);
    newStyleDiv.appendChild(sizeBL);
    newStyleDiv.appendChild(newColor);
    newStyleDiv.appendChild(newNode);
    newStyleDiv.appendChild(deleter);
    newDiv.appendChild(newStyleDiv);
        document.getElementById("hierarchy").appendChild(newDiv);
    } else if (parentDiv.id == 1 && nodeNumber > 5) {
        let confirmation = confirm("This will delete " + nodeNumber + " nodes, are you sure you want to do this?");
        if (confirmation == true) {
            parentDiv.remove();
            nodes = 1;
            let newDiv = document.createElement("div");
    newDiv.className = "nodeContainer";
    newDiv.id = nodes;
    newDiv.setAttribute("ondrop", "drop(event)");
    newDiv.setAttribute("ondragover", "allowDrop(event)");
    newDiv.setAttribute("draggable", "true");
    newDiv.setAttribute("ondragstart", "drag(event)");
    // create a new div with class nodeStyle
    let newStyleDiv = document.createElement("div");
    newStyleDiv.className = "nodeStyle";
    newStyleDiv.setAttribute("draggable", "true");
    // create input to name nodes
    let newName = document.createElement("input");
    newName.id = "name " + nodes;
    let newNameName = "name " + nodes;
    newName.setAttribute("type", "text");
    newName.setAttribute("name", newNameName);
    newName.setAttribute("placeholder", "enter name");
    // create input to give nodes a size
    let sizeBS = document.createElement("button");
    sizeBS.id = "smallB " + nodes;
    sizeBS.style.height = "12px";
    sizeBS.style.width = "12px";
    sizeBS.style.borderRadius = "6px";
    sizeBS.style.backgroundColor = "black";
    sizeBS.style.opacity = "0.5";
    sizeBS.style.border = "0";
    sizeBS.style.outline = "none";
    sizeBS.setAttribute("onclick", "smallB(this.id)")
    let sizeBM = document.createElement("button");
    sizeBM.id = "mediumB " + nodes;
    sizeBM.style.height = "16px";
    sizeBM.style.width = "16px";
    sizeBM.style.borderRadius = "8px";
    sizeBM.style.backgroundColor = "black";
    sizeBM.style.opacity = "1";
    sizeBM.style.border = "0";
    sizeBM.style.outline = "none";
    sizeBM.setAttribute("onclick", "mediumB(this.id)")
    let sizeBL = document.createElement("button");
    sizeBL.id = "largeB " + nodes;
    sizeBL.style.height = "20px";
    sizeBL.style.width = "20px";
    sizeBL.style.borderRadius = "10px";
    sizeBL.style.backgroundColor = "black";
    sizeBL.style.opacity = "0.5";
    sizeBL.style.border = "0";
    sizeBL.style.outline = "none";
    sizeBL.setAttribute("onclick", "largeB(this.id)")
    // create input to assign node colors
    let newColor = document.createElement("input");
    newColor.id = "color " + nodes;
    let newColorName = "name " + nodes;
    newColor.setAttribute("type", "color");
    newColor.setAttribute("name", newColorName);
    newColor.setAttribute("value", "#A70C0C");
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
    newStyleDiv.appendChild(newName);
    newStyleDiv.appendChild(sizeBS);
    newStyleDiv.appendChild(sizeBM);
    newStyleDiv.appendChild(sizeBL);
    newStyleDiv.appendChild(newColor);
    newStyleDiv.appendChild(newNode);
    newStyleDiv.appendChild(deleter);
    newDiv.appendChild(newStyleDiv);
            document.getElementById("hierarchy").appendChild(newDiv);
        }

    } else if (parentDiv.id != 1 && nodeNumber > 5) {
        let confirmation = confirm("This will delete " + nodeNumber + " nodes, are you sure you want to do this?");
        if (confirmation == true) {
            parentDiv.remove();
            nodes = nodes - nodeNumber;
        }
    } else {
        parentDiv.remove();
        nodes = nodes - nodeNumber;
    }
}

// functions to keep track of node size
function smallB(clicked_id) {
    document.getElementById(clicked_id).style.opacity = "1";
    document.getElementById("mediumB " + clicked_id.slice(7)).style.opacity = ".5";
    document.getElementById("largeB " + clicked_id.slice(7)).style.opacity = ".5";
}
function mediumB(clicked_id) {
    document.getElementById(clicked_id).style.opacity = "1";
    document.getElementById("smallB " + clicked_id.slice(8)).style.opacity = ".5";
    document.getElementById("largeB " + clicked_id.slice(8)).style.opacity = ".5";
}
function largeB(clicked_id) {
    document.getElementById(clicked_id).style.opacity = "1";
    document.getElementById("mediumB " + clicked_id.slice(7)).style.opacity = ".5";
    document.getElementById("smallB " + clicked_id.slice(7)).style.opacity = ".5";
}

// function to drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    // console.log(ev.target);
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target.classList.contains("nodeContainer")) {
    ev.target.appendChild(document.getElementById(data));
    } else {
        console.log("not a node container");
    }
}

// function to export 
function exportNetwork(data_export) {
const filename = 'data.json';
const jsonStr = JSON.stringify(data_export);

let element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
element.setAttribute('download', filename);

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);
}