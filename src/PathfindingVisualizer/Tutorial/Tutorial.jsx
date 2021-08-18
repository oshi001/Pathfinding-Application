import React, { Component } from "react";

import start from '../Node/images/start.png'; // Tell webpack this JS file uses this image
import end from '../Node/images/end.png';
import weight from '../Node/images/weight.png';
import wall from '../Node/images/wall.png';
import visitedWeight from '../Node/images/visitedWeight.png';
import pathWeight from '../Node/images/pathWeight.png';


import "./Tutorial.css";

export class Tutorial extends Component {

    componentDidMount() {
        document.addEventListener("DOMContentLoaded", function () {
            if (getCookie('visited') == null) {
                showPopUp();
                console.log("h")
                setCookie('visited', true);
            }
            else {
                skipPopUp();
            }
        });
    }
    render() {
        return (
            <div className="PopUpTextBox">
                <header>
                    <p>Tutorial for Dijkstra Search Visualizer</p>
                    <h3 onClick={skipPopUp}>x</h3>
                </header>

                <div className="PopUpIntroductionText">

                    <div className="player">

                        <label htmlFor="start">Start : </label>
                        <img src={start} name="start" alt="" />

                        <label htmlFor="end">End : </label>
                        <img src={end} name="end" alt="" />

                        <label htmlFor="wall">Tree : </label>
                        <img src={wall} name="wall" alt="" />

                        {/* <label htmlFor="wall">Visited Node : </label>
                        <div style={{ backgroundColor: 'rgba(0, 190, 218, 0.75)' }} name="wall"></div> */}

                        <label htmlFor="weight">food : </label>
                        <img src={weight} name="weight" alt="" />

                        <label htmlFor="visitedWeight">food eaten : </label>
                        <img src={visitedWeight} name="visitedWeight" alt="" />

                        <label htmlFor="pathWeight">food on Path : </label>
                        <img src={pathWeight} name="pathWeight" alt="" />

                    </div>
                    <div>

                    </div>
                </div>

                <div className="skipBox">

                    <button onClick={skipPopUp}>Close</button>
                </div>


            </div>
        );
    }
}

export const skipPopUp = () => {
    const elem = document.querySelector(".PopUp");
    const pathfindingVisualizer = document.querySelector(".pathfindingVisualizer");
    elem.style.display = "none";
    pathfindingVisualizer.style.filter = "none";
};

export const showPopUp = () => {
    const elem = document.querySelector(".PopUp");
    const pathfindingVisualizer = document.querySelector(".pathfindingVisualizer");
    elem.style.display = "block";
    pathfindingVisualizer.style.filter = " blur(4px)";
};

///////////////////////////////////////////////////////////////////
function setCookie(name, value) {
    var cookie = name + "=" + escape(value) + ";";
    document.cookie = cookie;
}

function getCookie(name) {
    var chunks = document.cookie.split(";");
    for (var i = chunks.length; i--;) {
        if (chunks[i].trim().split("=")[0].trim() === name) {
            return chunks[i].trim().split("=")[1].trim();
        }
    }
    return null;
}