import React, { useState, useEffect } from "react";
import "./Grid.css";

const rows = 10;
const columns = 10;
const cellSize = 30;

// Directions: N, S, E, W, NE, NW, SE, SW
const operations = [
  [0, 1], // right
  [0, -1], // left
  [1, -1], // top left
  [-1, 1], // top right
  [1, 1], // top
  [-1, -1], // bottom
  [1, 0], // bottom right
  [-1, 0], // bottom left
];

function createGrid() {
  var grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array.from(Array(columns), () => 0));
  }
  return grid;
}

export const Grid = () => {
  const [grid, setGrid] = useState();
  const [running, setRunning] = useState(false);

  const selectBox = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y] = grid[x][y] ? 0 : 1;
    setGrid(newGrid);
  };

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  return (
    <div className="grid-wrapper">
      <div className="buttons-toolbar">
        <button
          className={running ? "button stop" : "button start"}
          onClick={() => {
            setRunning(!running);
          }}
        >
          {running ? "Stop " : "Start"}
        </button>
        <button
          className="button red"
          onClick={() => {
            setRunning(false);
            setGrid(createGrid());
          }}
        >
          Reset
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px`,
        }}
        className="grid"
      >
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={i * columns + j}
                onClick={() => {
                  selectBox(i, j);
                }}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: grid[i][j] ? "lightgreen" : "",
                  border: "1px solid black",
                }}
                className="cell"
              ></div>
            ))
          )}
      </div>
    </div>
  );
};
