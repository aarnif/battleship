import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cell = ({
  playerName,
  shipNames,
  content,
  y,
  x,
  handleClickCell,
  handlePlaceShip,
}) => {
  const [bgColor, setBgColor] = useState("white");

  const changeBgColor = () => {
    if (shipNames.includes(content) && playerName === "Player") {
      setBgColor("#6b7280");
    } else if (content === "miss") {
      setBgColor("#ef4444");
    } else if (content === "hit") {
      setBgColor("#22c55e");
    } else {
      setBgColor("white");
    }
  };

  useEffect(() => {
    changeBgColor();
  }, [content]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setBgColor("#6b7280");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (shipNames.includes(content)) {
      setBgColor("#6b7280");
    } else {
      setBgColor("white");
    }
  };

  const handleOnMouseOver = (e) => {
    e.preventDefault();
    if (playerName === "Computer") {
      setBgColor("#d1d5db");
    }
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    changeBgColor();
  };

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      onDrag={handlePlaceShip ? (e) => e.preventDefault() : null}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handlePlaceShip ? (e) => handlePlaceShip(e, setBgColor) : null}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleMouseLeave}
      data-shipname={content}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      style={{
        backgroundColor: bgColor,
        cursor: handleClickCell ? "pointer" : "default",
      }}
      className="w-12 h-12 border border-black"
    ></button>
  );
};

const GameBoard = ({
  playerName,
  gameBoard,
  ships,
  handleClickCell = null,
  variants,
}) => {
  const shipNames = ships.map((ship) => ship.name);
  return (
    <motion.div
      {...variants}
      className="relative flex flex-col items-center"
      style={{ zIndex: playerName === "Player" && 100 }}
    >
      <h2 className="text-2xl font-bold">{playerName}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gameBoard.length}, 1fr)`,
          gridTemplateRows: `repeat(${gameBoard.length}, 1fr)`,
        }}
      >
        {gameBoard.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              playerName={playerName}
              shipNames={shipNames}
              x={x}
              y={y}
              content={cell}
              handleClickCell={handleClickCell}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default GameBoard;
