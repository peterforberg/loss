// This first function is just copy-and-pasted from the script.js, standard D3 code for making graphs
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

// This is the data for the example graphs
// Of note is that there are two nodes that appear to be named "meat," but one has a space, allowing these two networks to remain separate
data = {"nodes":[{"name":"meat ","color":"#a70c0c","size":20},{"name":"restaurant industry","color":"#a70c0c","size":10},{"name":"agriculture","color":"#a70c0c","size":10},{"name":"factory farms","color":"#a70c0c","size":10},{"name":"meat packing factories","color":"#a70c0c","size":10},{"name":"multi-national restaurants","color":"#a70c0c","size":10},{"name":"local restaurants","color":"#a70c0c","size":10},{"name":"steakhouses","color":"#a70c0c","size":10},{"name":"domesticated livestock","color":"#a70c0c","size":10},{"name":"grazing lands","color":"#a70c0c","size":10},{"name":"ecosystem","color":"#a70c0c","size":10},{"name":"methane gas","color":"#a70c0c","size":10},{"name":"meat","color":"#a70c0c","size":20},{"name":"red meat","color":"#a70c0c","size":10},{"name":"poultry","color":"#ffe68a","size":20},{"name":"fish","color":"#81bbdf","size":5},{"name":"beef","color":"#a70c0c","size":10},{"name":"pork","color":"#a70c0c","size":10},{"name":"cheeseburgers","color":"#a70c0c","size":10},{"name":"schnitzel","color":"#a70c0c","size":5},{"name":"turkey","color":"#fde587","size":10},{"name":"chicken","color":"#fde587","size":10},{"name":"meatloaf","color":"#fde587","size":10},{"name":"battered cod","color":"#87bce0","size":5},{"name":"fish tacos","color":"#85b9dc","size":5},{"name":"meatballs","color":"#a70c0c","size":5},{"name":"Top Notch","color":"#a70c0c","size":10},{"name":"hot dogs","color":"#a70c0c","size":10},{"name":"35th St Red Hots","color":"#a70c0c","size":10},{"name":"Irish beef stew","color":"#a70c0c","size":10},{"name":"chicken sandwich","color":"#fde587","size":10},{"name":"Popeyes","color":"#fde587","size":10},{"name":"Italian beef","color":"#a70c0c","size":10},{"name":"chicken brochette","color":"#fbe484","size":10},{"name":"Yassa","color":"#f8e182","size":10},{"name":"lamb","color":"#a70c0c","size":10}],"links":[{"source":"meat","target":"meat","identity":1},{"source":"red meat","target":"meat","identity":2},{"source":"poultry","target":"meat","identity":3},{"source":"fish","target":"meat","identity":4},{"source":"beef","target":"red meat","identity":5},{"source":"pork","target":"red meat","identity":6},{"source":"cheeseburgers","target":"beef","identity":7},{"source":"schnitzel","target":"pork","identity":8},{"source":"turkey","target":"poultry","identity":9},{"source":"chicken","target":"poultry","identity":10},{"source":"meatloaf","target":"turkey","identity":11},{"source":"battered cod","target":"fish","identity":12},{"source":"fish tacos","target":"fish","identity":13},{"source":"meatballs","target":"beef","identity":14},{"source":"meatballs","target":"pork","identity":15},{"source":"meatballs","target":"turkey","identity":16},{"source":"Top Notch","target":"cheeseburgers","identity":17},{"source":"hot dogs","target":"beef","identity":18},{"source":"35th St Red Hots","target":"hot dogs","identity":19},{"source":"Irish beef stew","target":"beef","identity":20},{"source":"chicken sandwich","target":"chicken","identity":21},{"source":"Popeyes","target":"chicken sandwich","identity":22},{"source":"Italian beef","target":"beef","identity":23},{"source":"chicken brochette","target":"chicken","identity":24},{"source":"Yassa","target":"chicken brochette","identity":25},{"source":"lamb","target":"red meat","identity":26},{"source":"Yassa","target":"lamb","identity":27},{"source":"meat ","target":"meat ","identity":1},{"source":"restaurant industry","target":"meat ","identity":2},{"source":"agriculture","target":"meat ","identity":3},{"source":"factory farms","target":"agriculture","identity":4},{"source":"meat packing factories","target":"agriculture","identity":5},{"source":"multi-national restaurants","target":"restaurant industry","identity":6},{"source":"local restaurants","target":"restaurant industry","identity":7},{"source":"steakhouses","target":"restaurant industry","identity":8},{"source":"domesticated livestock","target":"agriculture","identity":9},{"source":"grazing lands","target":"agriculture","identity":10},{"source":"ecosystem","target":"meat ","identity":11},{"source":"domesticated livestock","target":"ecosystem","identity":12},{"source":"methane gas","target":"ecosystem","identity":13}]}