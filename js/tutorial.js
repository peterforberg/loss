var clicks = 0;

function tutorial() {
    
    if (clicks == 0) {
        clicks++;
        document.getElementById("intro").style.display = "none";
        document.getElementById("example").style.display = "block";
    } else if (clicks == 1) {
        clicks++;
        document.getElementById("example").style.display = "none";
        document.getElementById("zero").style.display = "block";
    } else if (clicks == 2) {
        clicks++;
        document.getElementById("zero").style.display = "none";
        document.getElementById("one").style.display = "block";
    } else if (clicks == 3) {
        clicks++;
        document.getElementById("one").style.display = "none";
        document.getElementById("two").style.display = "block";
    }
}


// create an array with nodes
var nodes = new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ]);
  
  // create an array with edges
  var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ]);
  
  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  var network = new vis.Network(container, data, options);