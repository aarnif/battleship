import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const animationTransitionTime = 0.5;
const animationDelayTime = 0.5;

const FreeCell = ({ shipNames, content, y, x, handlePlaceShip }) => {
  const [bgColor, setBgColor] = useState("white");

  const changeBgColor = () => {
    if (shipNames.includes(content)) {
      setBgColor("#6b7280");
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

  const handleMouseLeave = (e) => {
    e.preventDefault();
    changeBgColor();
  };

  return (
    <div
      onDrag={handlePlaceShip ? (e) => e.preventDefault() : null}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handlePlaceShip ? (e) => handlePlaceShip(e, setBgColor) : null}
      onMouseLeave={handleMouseLeave}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      style={{
        backgroundColor: bgColor,
        cursor: "default",
      }}
      className="w-12 h-12 border border-black group"
    ></div>
  );
};

const PlacedShip = ({ ship, handleDragStart, handleChangeShipPosition }) => {
  return (
    <motion.div
      key={ship.name}
      style={{
        gridArea: ship.name,
        display: "flex",
        flexDirection: ship.position === "horizontal" ? "row" : "column",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group"
      draggable={true}
      onDragStart={(e) => handleDragStart(e, ship)}
      onClick={handleChangeShipPosition}
    >
      {ship.coordinates.map((coordinate) => (
        <div
          data-shipname={ship.name}
          key={`${coordinate[0]}-${coordinate[1]}`}
          style={{
            cursor: "pointer",
          }}
          className="w-12 h-12 border border-black bg-gray-500 group-hover:bg-gray-600"
        ></div>
      ))}
    </motion.div>
  );
};

const ShipPlacementBoard = ({
  playerName,
  gameBoard,
  ships,
  shipNames,
  handleDragStart,
  handlePlaceShip,
  handleChangeShipPosition,
  areAllShipsPlaced,
}) => {
  const generateGridTemplate = (array) =>
    array
      .map((row) =>
        row.map((cell) => (shipNames.includes(cell) ? cell : ".")).join(" ")
      )
      .join("'\n'");

  const nonShipCells = gameBoard
    .map((row, x) => row.map((cell, y) => !shipNames.includes(cell) && [x, y]))
    .flat()
    .filter((cell) => cell !== false);

  const gridTemplateAreas = `'${generateGridTemplate(gameBoard)}'`;
  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ zIndex: 100 }}
      initial={{ opacity: 1, left: "50%", transform: "translateX(-50%)" }}
      animate={{
        opacity: 1,
        left: areAllShipsPlaced ? "50%" : 0,
        transform: areAllShipsPlaced ? "translateX(-50%)" : "translateX(0)",
        transition: { delay: animationDelayTime },
      }}
      transition={{
        duration: animationTransitionTime,
      }}
    >
      <h2 className="text-2xl font-bold">{playerName}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateAreas: gridTemplateAreas,
        }}
      >
        {ships.map((ship) => (
          <PlacedShip
            key={ship.name}
            ship={ship}
            handleDragStart={handleDragStart}
            handleChangeShipPosition={handleChangeShipPosition}
          />
        ))}
        {nonShipCells.map((cell) => (
          <FreeCell
            key={`${cell[0]}-${cell[1]}`}
            shipNames={shipNames}
            content={gameBoard[cell[0]][cell[1]]}
            x={cell[0]}
            y={cell[1]}
            handlePlaceShip={handlePlaceShip}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ShipsContainer = ({ shipTypes, shipNames, handleDragStart }) => {
  const unPlacedShips = shipTypes.filter(
    (ship) => !shipNames.includes(ship.name)
  );

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, right: "50%", transform: "translateX(50%)" }}
      animate={{
        opacity: 1,
        right: 0,
        transform: "translateX(0)",
        transition: { delay: animationDelayTime },
      }}
      exit={{
        opacity: 1,
        right: "50%",
        transform: "translateX(50%)",
        transition: { delay: animationDelayTime },
      }}
      transition={{
        duration: animationTransitionTime,
      }}
    >
      <h2 className="text-2xl font-bold">Ships</h2>
      <div className="w-[480px] h-[480px] p-8 flex flex-col items-start border border-black">
        {unPlacedShips.map((ship) => (
          <div
            key={ship.name}
            className="flex-grow flex hover:cursor-pointer group"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, ship)}
          >
            {[...Array(ship.length).keys()].map((index) => (
              <div
                key={`${ship.name}-${index}`}
                className="w-12 h-12 border border-black bg-gray-500 group-hover:bg-gray-600"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PlaceShips = ({
  playerName,
  gameBoard,
  shipTypes,
  ships,
  handlePlaceShip,
  handleChangeShipPosition,
  areAllShipsPlaced,
}) => {
  const shipNames = ships.map((ship) => ship.name);

  const handleDragStart = (event, ship) => {
    event.dataTransfer.setData("ship-name", ship.name);
    event.dataTransfer.setData("ship-position", ship.position);
  };

  return (
    <>
      <ShipPlacementBoard
        key="ship-placement-board"
        playerName={playerName}
        gameBoard={gameBoard}
        ships={ships}
        shipNames={shipNames}
        handleDragStart={handleDragStart}
        handlePlaceShip={handlePlaceShip}
        handleChangeShipPosition={handleChangeShipPosition}
        areAllShipsPlaced={areAllShipsPlaced}
      />
      <AnimatePresence>
        {!areAllShipsPlaced && (
          <ShipsContainer
            key="ships-container"
            shipTypes={shipTypes}
            shipNames={shipNames}
            handleDragStart={handleDragStart}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PlaceShips;
