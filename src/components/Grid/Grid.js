import React, { useState, useEffect } from "react";
import "./Grid.css";

const rows = 10;
const columns = 10;
const cellSize = 30;

function createGrid() {
  var grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array.from(Array(columns), () => 0));
  }
  return grid;
}

export const Grid = () => {
  const [grid, setGrid] = useState();

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  return (
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
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: grid[i][j] ? "lightgreen" : "white",
                border: "1px solid black",
              }}
            >
              {i * columns + j}
            </div>
          ))
        )}
    </div>
  );
};
