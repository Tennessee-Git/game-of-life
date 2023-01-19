import React, { useState, useRef } from "react";
import "./Grid.css";

const rows = 25;
const columns = 60;
const cellSize = 30;

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
  const [grid, setGrid] = useState(() => {
    return createGrid();
  });
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const [intervalId, setIntervalId] = useState();

  const selectBox = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y] = grid[x][y] ? 0 : 1;
    setGrid(newGrid);
  };

  function runSimulation() {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      const newGrid = g.map((row, i) => {
        return row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < columns) {
              neighbors += g[newI][newJ];
            }
          });
          if (neighbors < 2 || neighbors > 3) {
            return 0;
          }
          if (neighbors === 3 && cell === 0) {
            return 1;
          }
          return g[i][j];
        });
      });
      return newGrid;
    });
  }

  return (
    <div className="grid-wrapper">
      <div className="buttons-toolbar">
        <button
          className={running ? "button stop" : "button start"}
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              setIntervalId(
                setInterval(() => {
                  runSimulation();
                }, 500)
              );
            } else clearInterval(intervalId);
          }}
        >
          {running ? "Stop " : "Start"}
        </button>
        <button
          className="button red"
          onClick={() => {
            setRunning(false);
            setGrid(createGrid());
            clearInterval(intervalId);
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
