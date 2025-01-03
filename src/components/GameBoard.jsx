import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import AimCursor from "./AimCursor.jsx";
import ShipIcon from "./ShipIcon.jsx";
import helpers from "../helpers.js";

const Cell = ({ playerName, shipNames, content, y, x, handleClickCell }) => {
  const classStyles = {
    default: {
      Computer:
        "w-12 h-12 bg-cell hover:bg-cell-hover border border-border group cursor-none",
      Player: "w-12 h-12 bg-cell border border-border group cursor-default",
    },
    ship: {
      Computer: "w-12 h-12 bg-ship-cell border border-border group cursor-none",
      Player:
        "w-12 h-12 bg-ship-cell border border-border group cursor-default",
    },
    miss: {
      Computer: "w-12 h-12 bg-cell-miss border border-border group cursor-none",
      Player:
        "w-12 h-12 bg-cell-miss border border-border group cursor-default",
    },
    hit: {
      Computer: "w-12 h-12 bg-cell-hit border border-border group cursor-none",
      Player: "w-12 h-12 bg-cell-hit border border-border group cursor-default",
    },
  };

  const [cellStyle, setCellStyle] = useState(classStyles.default[playerName]);

  const changeBgColor = () => {
    if (shipNames.includes(content) && playerName === "Player") {
      setCellStyle(classStyles.ship[playerName]);
    } else if (content === "miss") {
      setCellStyle(classStyles.miss[playerName]);
    } else if (content === "hit") {
      setCellStyle(classStyles.hit[playerName]);
    } else {
      setCellStyle(classStyles.default[playerName]);
    }
  };

  useEffect(() => {
    changeBgColor();
  }, [content]);

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      data-shipname={content ? content : "default"}
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
  const cursorWidth = 40;
  const cursorHeight = 40;

  const [gridTemplateAreas, setGridTemplateAreas] = useState(
    `'${helpers.generateGridTemplate(shipNames, gameBoard)}'`
  );

  const [nonShipCells, setNonShipCells] = useState(
    helpers.generateNonShipCells(shipNames, gameBoard)
  );

  const [showAimCursor, setShowAimCursor] = useState(false);
  const [aimCursorCoordinates, setAimCursorCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [aimCursorTarget, setAimCursorTarget] = useState(null);

  const boardContainerClass = {
    Player: "z-10 relative flex flex-col items-center",
    Computer: "relative flex flex-col items-center",
  };

  const shipClasses = {
    horizontal: "relative group flex justify-center items-center",
    vertical: "relative group flex flex-col justify-center items-center",
  };

  const moveAimCursor = (event) => {
    if (playerName === "Computer") {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left - cursorWidth / 2;
      const y = event.clientY - rect.top - cursorHeight / 2;
      const cellElementUnderAim = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      setAimCursorTarget(cellElementUnderAim.dataset.shipname);
      setAimCursorCoordinates({ x, y });
    }
  };

  const handleMouseOver = () => {
    if (playerName === "Computer") {
      setShowAimCursor(true);
    }
  };

  const handleMouseOut = () => {
    if (playerName === "Computer") {
      setShowAimCursor(false);
    }
  };

  return (
    <motion.div
      {...variants}
      transition={{ duration: 0.5 }}
      className={boardContainerClass[playerName]}
    >
      <h2 className="mb-2 text-3xl font-bold">{playerName}</h2>
      <div
        className="relative grid cursor-none"
        style={{
          gridTemplateAreas: gridTemplateAreas,
        }}
        onMouseOver={handleMouseOver}
        onMouseMove={moveAimCursor}
        onMouseOut={handleMouseOut}
      >
        {ships.map((ship) => (
          <motion.div
            key={ship.name}
            style={{
              gridArea: ship.name,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={shipClasses[ship.position]}
          >
            {(ship.isSunk || playerName === "Player") && (
              <ShipIcon ship={ship} />
            )}
            {ship.coordinates.map((coordinate) => (
              <Cell
                key={`${coordinate[0]}-${coordinate[1]}`}
                playerName={playerName}
                shipNames={shipNames}
                x={coordinate[0]}
                y={coordinate[1]}
                content={gameBoard[coordinate[0]][coordinate[1]]}
                handleClickCell={handleClickCell}
              />
            ))}
          </motion.div>
        ))}
        {nonShipCells.map((cell) => (
          <Cell
            key={`${cell[0]}-${cell[1]}`}
            playerName={playerName}
            shipNames={shipNames}
            x={cell[0]}
            y={cell[1]}
            content={gameBoard[cell[0]][cell[1]]}
            handleClickCell={handleClickCell}
          />
        ))}
        {showAimCursor && (
          <AimCursor
            cursorWidth={cursorWidth}
            cursorHeight={cursorHeight}
            aimCursorCoordinates={aimCursorCoordinates}
            aimCursorTarget={aimCursorTarget}
          />
        )}
      </div>
    </motion.div>
  );
};

export default GameBoard;
