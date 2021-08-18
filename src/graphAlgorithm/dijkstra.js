
export function dijkstra(grid, startNode, endNode) {
    const VisitedNodesInOrder = [];//to animate the searching process
    startNode.distance = 0;


    const UnVisitedNodes = getAllNodes(grid);
    // console.log(UnVisitedNodes[0], "hi");

    while (UnVisitedNodes.length) {
        SortNodesByDistance(UnVisitedNodes);
        const closeNode = UnVisitedNodes.shift();//return the first element or undefined

        //if there is a wall then continue
        if (closeNode.isWall) continue;

        //making the nodes as visited
        if (closeNode.distance === Infinity) return VisitedNodesInOrder;
        closeNode.isVisited = true;

        VisitedNodesInOrder.push(closeNode);

        if (closeNode === endNode) {
            // console.log(VisitedNodesInOrder[0], "aatoh rah ahe");
            return VisitedNodesInOrder;
        }



        Update_unvisted_neighbour(closeNode, grid);


    }

}


//sort the unvisited nodes
function SortNodesByDistance(UnVisitedNodes) {
    //as the nodes have distace(a string number)
    //sort function doesnot work for string_number
    //so we use compare function
    UnVisitedNodes.sort(function (nodeA, nodeB) { return nodeA.distance - nodeB.distance });//in ascending order

}

function Update_unvisted_neighbour(curr_node, grid) {
    const un_visited_neighbour = getUnVisNbr(curr_node, grid);

    //nbr-->neighbours
    for (let nbr of un_visited_neighbour) {
        //setting the distance of the nbr nodes 
        nbr.distance = curr_node.distance + nbr.weight + 1;
        // console.log(nbr.weight);
        nbr.previous_node = curr_node;
    }

}

function getUnVisNbr(node, grid) {
    let nbr = [];//nbr-->neighbours
    const {
        row, col
    } = node;//col and row properties of node

    if (row > 0) nbr.push(grid[row - 1][col]);
    if (col > 0) nbr.push(grid[row][col - 1]);
    if (row < grid.length - 1) nbr.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) nbr.push(grid[row][col + 1]);

    return nbr.filter((i) => !i.isVisited);


}


function getAllNodes(grid) {
    let nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}




//backtracking from end node to start node to  get the minmum path
export function get_The_shortest_path(endnode) {
    let nodes_in_shortest_path = [];
    let curr_Node = endnode;
    while (curr_Node !== null) {
        nodes_in_shortest_path.unshift(curr_Node);
        curr_Node = curr_Node.previous_node;
    }
    return nodes_in_shortest_path;
}