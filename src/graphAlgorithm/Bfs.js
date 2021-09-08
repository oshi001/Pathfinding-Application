
export function bfs(grid, startNode, endNode) {
    const VisitedNodesInOrder = [];//to animate the searching process
    startNode.distance = 0;

    //to get all the nodes in grid
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


        //updating my neighbours which are close to closenode  
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
        //checking if my previous distance is greater then my curr distance
        if (nbr.distance > curr_node.distance + nbr.weight) {
            nbr.distance = curr_node.distance + nbr.weight;
        }

        // console.log(nbr.weight);
        // With this property we can backtrack and find the shortest path between the start and end node.
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





//bfs

// const dx = [-1, 1, 0, 0];
// const dy = [0, 0, -1, 1];

// function isSafe(row, col, grid) {
//     let rowLength = grid.length;
//     let columnLength = grid[0].length;
//     if (row >= rowLength || row < 0 || col >= columnLength || col < 0 || grid[row][col].isVisited) return false;
//     return true;
// }



// export function bfs(grid, startNode, endNode) {
//     const VisitedNodesInOrder = [];
//     let queue = [startNode];

//     while (queue.length) {
//         const curr_Node = queue.shift();
//         // console.log("he");


//         if (!curr_Node.isWall && (curr_Node.isStart || !curr_Node.isVisited)) {
//             curr_Node.isVisited = true;

//             VisitedNodesInOrder.push(curr_Node);

//             const { col, row } = curr_Node;

//             let next_Node;

//             for (let i = 0; i < 4; i++) {
//                 let R = row + dx[i];
//                 let C = col + dy[i];
//                 // console.log(row, col);

//                 if (isSafe(R, C, grid)) {
//                     // console.log(R, C);
//                     next_Node = grid[R][C];
//                     // console.log(next_Node);
//                     // if (next_Node.row == 19 && next_Node.col == 48) {
//                     //     console.log("19-48");
//                     // }
//                     // else if (next_Node.row == 18 && next_Node.col == 49) {
//                     //     console.log("19-49");
//                     // }
//                     next_Node.previous_node = curr_Node;
//                     queue.push(next_Node);

//                 }
//             }
//         }
//         if (curr_Node == endNode) return VisitedNodesInOrder;

//     }
//     return VisitedNodesInOrder;
// }














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



// const depthFirstSearch = (grid, startNode, finishNode) => {
//     const dx = [-1, 0, 1, 0];
//     const dy = [0, 1, 0, -1];

//     const visitedNodesInOrder = [];
//     const dfsStack = [];

//     dfsStack.push(startNode);
//     while (dfsStack.length) {
//       const currentNode = dfsStack.pop();

//       if (currentNode === finishNode) {
//         return visitedNodesInOrder;
//       }

//       if (!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
//         currentNode.isVisited = true;
//         visitedNodesInOrder.push(currentNode);
//         const { col, row } = currentNode;
//         let nextNode;

//         for(let i = 0 ; i < 4 ; ++i) {
//           if(isValid(row + dx[i] , col + dy[i])) {
//             nextNode = grid[row + dx[i]][col + dy[i]];
//             if(!nextNode.isVisited) {
//               nextNode.previousNode = currentNode;
//               dfsStack.push(nextNode);          
//             }
//           }
//         }
//       }
//     }

//     return visitedNodesInOrder;
//   }


//   const dfsBtn = document.getElementById('dfs');
//   dfsBtn.addEventListener('click', async () => {
//     const startNode = grid[startRow][startCol];
//     const finishNode = grid[finishRow][finishCol];

//     clearGrid();
//     isRunning = true;

//     toggledButtonDisable(isRunning);

//     const visitedeNodesInOrder = depthFirstSearch(grid, startNode, finishNode);



//     await animateAlgorithm(visitedeNodesInOrder, "dfs");
//     const path = getPath(finishNode);

//     await animatePath(path);
//     isRunning = false;

//     toggledButtonDisable(isRunning);

//   })