import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import tailwindConfig from "../../tailwind.config";

const Cell = ({ playerName, shipNames, content, y, x, handleClickCell }) => {
  const isCellUnclicked =
    playerName === "Computer" && content !== "miss" && content !== "hit";
  const [bgColor, setBgColor] = useState(
    tailwindConfig.theme.extend.colors.cell.DEFAULT
  );

  const changeBgColor = () => {
    if (shipNames.includes(content) && playerName === "Player") {
      setBgColor(tailwindConfig.theme.extend.colors.shipCell.DEFAULT);
    } else if (content === "miss") {
      setBgColor(tailwindConfig.theme.extend.colors.cell.miss);
    } else if (content === "hit") {
      setBgColor(tailwindConfig.theme.extend.colors.cell.hit);
    } else {
      setBgColor(tailwindConfig.theme.extend.colors.cell.DEFAULT);
    }
  };

  useEffect(() => {
    changeBgColor();
  }, [content]);

  const handleOnMouseOver = (e) => {
    e.preventDefault();
    if (isCellUnclicked) {
      setBgColor(tailwindConfig.theme.extend.colors.cell.hover);
    }
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    changeBgColor();
  };

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleMouseLeave}
      data-shipname={content}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      style={{
        backgroundColor: bgColor,
        cursor: isCellUnclicked ? "pointer" : "default",
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
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center"
      style={{ zIndex: playerName === "Player" && 10 }}
    >
      <h2 className="mb-2 text-3xl font-bold">{playerName}</h2>
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
