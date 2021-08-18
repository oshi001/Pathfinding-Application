import { render } from '@testing-library/react';
import React, { Component } from 'react';

import Node from './Node/Node.jsx';
import { showPopUp } from "./Tutorial/Tutorial.jsx";

import './PathfindingVisualizer.css';

import { dijkstra, get_The_shortest_path } from "../graphAlgorithm/dijkstra";

let row_max_len = 20;
let col_max_len = 50;

let Start_Node_Row = 0;
let Start_Node_Col = 0;
let Final_Node_Row = 19;
let Final_Node_Col = 49;





// The component also requires a render() method, this method returns HTML.
export default class PathfindingVisualizer extends Component {

    //propes are arguments that are passed into the argument 
    //propes -->properties
    constructor(props) {
        super(props);

        //state-->built in object
        //the state may contain as many properties as u like
        //thinks we need to update/change we put in this.state
        this.state = {
            grid: [],
            mouseIspressed: false,
            algoName: "Dijkstra Algorithm",
            weight: 1,
            changeweight: false,
            distactTobetraveled: 0

        };
    }

    //greating a grid
    // / The componentDidMount() method is called after the component is rendered
    //this is where u run statement that requires that the componenet is alreadu is placed in the DOM
    componentDidMount() {
        const grid = getNewGrid();
        this.setState({ grid });
    }


    // // on pressing the mouse down
    // When user press the mouse button down, a mousedown event is triggered, and when user release, a mouseup event is triggered.
    WhenMouseDown(row, col) {
        let newgrid = [];
        if (row == Start_Node_Row && col == Start_Node_Col) {
            console.log("in");

            CreatenewGridwith_Enlargepic(this.state.grid, row, col);
            this.setState({ mouseIspressed: true });
            return;

        }
        if (this.state.changeweight) {
            newgrid = CreatenewGridwithWall_weight(this.state.grid, row, col, this.state.weight);
        }
        else {
            newgrid = CreatenewGridwithWall(this.state.grid, row, col);
        }
        this.setState({ grid: newgrid, mouseIspressed: true });
    }

    //relising the mousedown btn
    WhenMouseUp() {
        if (this.state.mouseIspressed) {
            console.log("out");
            this.setState({ mouseIspressed: false });
        }
    }

    //whenever the mouse hover over over the grid
    WhenMouseEntre(row, col) {

        if (!this.state.mouseIspressed) return;

        let newgrid = [];
        if (this.state.changeweight) {
            newgrid = CreatenewGridwithWall_weight(this.state.grid, row, col, this.state.weight);
        }
        else {
            newgrid = CreatenewGridwithWall(this.state.grid, row, col);
        }
        this.setState({ grid: newgrid });

    }



    //weightToggle
    weightChangeHandler = () => {
        // console.log(this.state.weight);
        this.setState({ weight: document.getElementById('weight').value });

        // console.log(this.state.grid[Start_Node_Row - 1][Start_Node_Col + 1]);

    };


    VisulaizerDijksra() {
        const {
            grid
        } = this.state;
        const startNode = grid[Start_Node_Row][Start_Node_Col];
        const EndNode = grid[Final_Node_Row][Final_Node_Col];
        console.log(startNode, EndNode);
        const Order_of_Visisted_nodes = dijkstra(grid, startNode, EndNode);
        console.log(Order_of_Visisted_nodes[0], "ko");
        const shortest_path = get_The_shortest_path(EndNode);
        this.AnimateDijstra(Order_of_Visisted_nodes, shortest_path);

    }


    AnimateDijstra(Order_of_Visisted_nodes, shortest_path) {
        // console.log(this.state.grid[Start_Node_Row - 1][Start_Node_Col + 1], this.state.grid[Start_Node_Row - 1][Start_Node_Col + 2]);
        // console.log(this.state.grid[Start_Node_Row + 1][Start_Node_Col + 1]);
        for (let i = 1; i <= Order_of_Visisted_nodes.length; i++) {

            //when we reach the final node
            if (i === Order_of_Visisted_nodes.length) {
                setTimeout(() => {
                    // this.setState({ algoName: "Shortest Path" });
                    this.animateShortestPath(shortest_path);
                }, 10 * i);
                return;
            }

            if (i === Order_of_Visisted_nodes.length - 1) continue;
            setTimeout(() => {
                const node = Order_of_Visisted_nodes[i];
                if (node.isWeight) {
                    let Weighted_node = document.getElementById(`node-${node.row}-${node.col}`);
                    Weighted_node.className = "node node-visitedWeight";
                }
                else {
                    let Visited_node = document.getElementById(`node-${node.row}-${node.col}`);
                    Visited_node.className = "node node-isVisited";
                }
            }, 10 * i);

        }
    }

    animateShortestPath(shortest_path) {
        let time_taken = 0;
        for (let i = 1; i < shortest_path.length - 1; i++) {
            setTimeout(() => {
                const node = shortest_path[i];
                if (node.isWeight) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-ShortP-Weight";
                }
                else {
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-ShortP";
                }
            }, 50 * i);
        }
        // console.log(this.state.grid[9][31]);
        time_taken = shortest_path[shortest_path.length - 1].distance;
        setTimeout(() => {
            alert(`time taken is${time_taken}`);
        }, 70 * shortest_path.length);

    }




    //allocate staring point and endingpoint
    pointChangeHandler = () => {
        if (this.isvalid()) return;
        //removing the previous pics from the grid 
        //class named node is a clear grid with no pics 
        document.getElementById(`node-${Start_Node_Row}-${Start_Node_Col}`).className = "node";
        document.getElementById(`node-${Final_Node_Row}-${Final_Node_Col}`).className = "node";

        Start_Node_Row = parseInt(document.querySelector('#start_row').value);
        Start_Node_Col = parseInt(document.querySelector('#start_col').value);
        Final_Node_Row = parseInt(document.querySelector('#end_row').value);
        Final_Node_Col = parseInt(document.querySelector('#end_col').value);

        // let changeStart = document.getElementById(`node-${Start_Node_Row}-${Start_Node_Col}`);
        document.getElementById(`node-${Start_Node_Row}-${Start_Node_Col}`).className = 'node node-start';

        // let changeFinal = document.getElementById(`node-${Final_Node_Row}-${Final_Node_Col}`);
        document.getElementById(`node-${Final_Node_Row}-${Final_Node_Col}`).className = 'node node-finish';


    }

    isvalid = () => {

        // if (
        //     isNaN(parseInt(document.getElementById("start_row").value)) ||
        //     isNaN(parseInt(document.getElementById("start_col").value)) ||
        //     isNaN(parseInt(document.getElementById("end_row").value)) ||
        //     isNaN(parseInt(document.getElementById("end_col").value))
        // ) return true;


        if (
            parseInt(document.getElementById("start_row").value) > row_max_len ||
            parseInt(document.getElementById("start_col").value) > col_max_len
        ) return true;

        if (
            parseInt(document.getElementById("start_row").value) < 0 ||
            parseInt(document.getElementById("start_col").value) < 0
        ) return true;


        if (
            parseInt(document.getElementById("end_row").value) > row_max_len ||
            parseInt(document.getElementById("end_col").value) > col_max_len
        ) return true;

        if (
            parseInt(document.getElementById("end_row").value) < 0 ||
            parseInt(document.getElementById("end_col").value) < 0
        ) return true;


        return false;
    }


    toggle_true_false = () => {
        // changeweight is ued to for true or false of the weight
        const temp = this.state.changeweight;
        this.setState({ changeweight: !temp });
    };

    render() {
        const {
            grid,
            mouseIspressed,
            algoName,
            distactTobetraveled,
        } = this.state;

        let play_btn = (
            <h3 className='btn' onClick={() => this.VisulaizerDijksra()}>Start Dijkstra Algorithm</h3>
        );

        // bnt change to true or false
        let changeText = "Close";
        if (this.state.changeweight) changeText = "Open";

        //storing into one div(ControlBox)
        let ControlBox = (
            <div className="controlbox">
                <div className="weightContainer">
                    <label htmlFor='quantity'>Food:</label>

                    <input type="number" id="weight" name="quantity" min="1" max="5" onChange={this.weightChangeHandler} defaultValue="1" />

                    {/* make btn true or false */}
                    <button onClick={this.toggle_true_false}>{changeText}</button>
                </div>

                {/* //startpoint: */}
                <div className="startPointContainer">
                    <label htmlFor="point">Start Point:</label>
                    {/* The onchange event occurs when the value of an element has been changed */}

                    <input type="number" id="start_row" name="point" min="0" max={row_max_len - 1} onChange={this.pointChangeHandler} defaultValue="0"></input>

                    <input type="number" id="start_col" name="point" min="0" max={col_max_len - 1} onChange={this.pointChangeHandler} defaultValue="0"></input>
                </div>

                {/* //endpoint: */}
                <div className="endPointContainer">
                    <label htmlFor="point">End Point:</label>
                    <input type="number" id="end_row" name="point" min="0" max={row_max_len - 1} onChange={this.pointChangeHandler} defaultValue="19"></input>
                    <input type="number" id="end_col" name="point" min="0" max={col_max_len - 1} onChange={this.pointChangeHandler} defaultValue="49"></input>
                </div>

                <div className="buttonContainer">{play_btn}</div>


            </div>



        );





        return (


            <div className="pathfindingVisualizer">
                <div className="container">
                    <header>
                        <h2 className="top" onClick={showPopUp}>Pathfinding Visualizer</h2>
                        <h2 className="algo">{algoName}</h2>
                    </header>
                    {ControlBox}
                    <p>Dijkstra’s Algorithm is used for finding the shortest distance, or path, from starting node to target node in a weighted path  </p>

                </div>


                {/* --------------grid dispaly----------------- */}
                <div className="visualGridContainer">
                    <div className='gridBox'>
                        <table className='grid' >
                            {/* //The <tbody> tag is used to group the body content in an HTML table */}
                            <tbody>
                                {
                                    grid.map((row, rowidx) => {
                                        return (
                                            /* A “key” is a special string attribute you need to include when creating lists of elements. */
                                            /* Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity: */
                                            <tr key={rowidx}>
                                                {row.map((node, nodeidx) => {
                                                    const { isStart, isFinish, isWall, isWeight } = node; //Extracting from the node
                                                    // console.log(node.isStart, node.isFinish, node.isWall);
                                                    return (
                                                        <Node
                                                            row={rowidx}
                                                            col={nodeidx}
                                                            key={rowidx + "-" + nodeidx}
                                                            isStart={isStart}
                                                            isFinish={isFinish}
                                                            isWall={isWall}
                                                            isWeight={isWeight}
                                                            mouseIspressed={mouseIspressed}
                                                            onMouseDown={(row, col) =>
                                                                this.WhenMouseDown(row, col)
                                                            }
                                                            onMouseEnter={(row, col) =>
                                                                this.WhenMouseEntre(row, col)
                                                            }
                                                            onMouseUp={() => this.WhenMouseUp()}>

                                                        </Node>
                                                    );

                                                })}
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        );
    }
}

//this const function always should be defined outside of the class
const getNewGrid = () => {
    const grid = [];
    for (var row = 0; row < row_max_len; row++) {
        const currRow = [];
        for (var col = 0; col < col_max_len; col++) {
            currRow.push(createNode(row, col));
        }
        grid.push(currRow);
    }
    return grid;

};

//const should be there before a function always
//creating a grid
const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === Start_Node_Row && col === Start_Node_Col,
        isFinish: row === Final_Node_Row && col === Final_Node_Col,
        distance: Infinity,
        isWall: false,
        isWeight: false,
        isVisited: false,
        previous_node: null,
        weight: 0,
    };
};


const CreatenewGridwithWall = (grid, row, col) => {

    // const newGrid = [...grid];
    //     // ES6 (shallow copy)
    //     // For completeness, note that ES6 offers two shallow copy mechanisms: Object.assign() and the spread syntax. which copies values of all enumerable own properties from one object to another.
    //     //copy from one oject to another
    //     const newgrid = [...grid];
    const node = grid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    grid[row][col] = newNode;
    // console.log(grid[row][col - 1]);
    return grid;
}


const CreatenewGridwithWall_weight = (grid, row, col, weight) => {

    const node = grid[row][col];
    if (node.weight != 0) {
        node.weight = 0;
        node.isWeight = !node.isWeight;
        grid[row][col] = node;
        console.log(node);
    }
    else {
        const newNode = {
            ...node,
            isWeight: !node.isWeight,
            weight: parseInt(weight),
        };
        grid[row][col] = newNode;
        console.log(newNode);
    }


    return grid;
}


const CreatenewGridwith_Enlargepic = (grid, row, col, weight) => {
    const node = grid[row][col];
    const newNode = {
        ...node,
        isBig: !node.isBig,
    };
    grid[row][col] = newNode;
    // console.log(grid[row][col - 1]);
    return grid;
}

