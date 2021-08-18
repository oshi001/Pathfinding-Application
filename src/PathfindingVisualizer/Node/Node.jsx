import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // onClick is equal to onMouseUp + onMouseDown
    render() {
        //we use className insted of class in react js
        const {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            isWeight,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        // console.log(row,col,'hi');


        const chooseWhichClass_toApply = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" : isWeight ? "node-weight" : "";

        return (
            <td
                id={`node-${row}-${col}`}
                className={`node ${chooseWhichClass_toApply}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}

            >

            </td>
        );
    }

}