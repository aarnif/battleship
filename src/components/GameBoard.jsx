import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cell = ({ playerName, shipNames, content, y, x, handleClickCell }) => {
  const classStyles = {
    default:
      "w-12 h-12 bg-cell hover:bg-cell-hover border border-border group cursor-pointer",
    ship: "w-12 h-12 bg-shipCell border border-border group cursor-pointer",
    miss: "w-12 h-12 bg-cell-miss border border-border group cursor-default",
    hit: "w-12 h-12 bg-cell-hit border border-border group cursor-default",
  };

  const [cellStyle, setCellStyle] = useState(classStyles.default);

  const changeBgColor = () => {
    if (shipNames.includes(content) && playerName === "Player") {
      setCellStyle(classStyles.ship);
    } else if (content === "miss") {
      setCellStyle(classStyles.miss);
    } else if (content === "hit") {
      setCellStyle(classStyles.hit);
    } else {
      setCellStyle(classStyles.default);
    }
  };

  useEffect(() => {
    changeBgColor();
  }, [content]);

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      data-shipname={content}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      className={cellStyle}
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
        className="grid"
        style={{
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
