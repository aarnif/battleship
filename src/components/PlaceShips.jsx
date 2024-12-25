import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import shipIcons from "./shipIcons";
import helpers from "../helpers";

const animationTransitionTime = 0.5;
const animationDelayTime = 0.5;

const FreeCell = ({ shipNames, content, y, x, handlePlaceShip }) => {
  const classStyles = {
    free: "w-12 h-12 bg-cell border border-border group",
    ship: "w-12 h-12 bg-ship-cell border border-border group",
  };

  const [cellStyle, setCellStyle] = useState(classStyles.free);

  const changeCellStyle = () => {
    setCellStyle(
      shipNames.includes(content) ? classStyles.ship : classStyles.free
    );
  };

  useEffect(() => {
    changeCellStyle();
  }, [content]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setCellStyle(classStyles.ship);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setCellStyle(
      shipNames.includes(content) ? classStyles.ship : classStyles.free
    );
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    changeCellStyle();
  };

  return (
    <div
      onDrag={handlePlaceShip ? (e) => e.preventDefault() : null}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handlePlaceShip ? (e) => handlePlaceShip(e, setCellStyle) : null}
      onMouseLeave={handleMouseLeave}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      className={cellStyle}
    ></div>
  );
};

const PlacedShip = ({ ship, handleDragStart, handleChangeShipPosition }) => {
  const shipClasses = {
    horizontal: "relative group flex justify-center items-center",
    vertical: "relative group flex flex-col justify-center items-center",
  };

  return (
    <motion.button
      key={ship.name}
      style={{
        gridArea: ship.name,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={shipClasses[ship.position]}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, ship)}
      onClick={() => handleChangeShipPosition(ship.name)}
    >
      <div className={shipIcons[ship.name][ship.position]}>
        {shipIcons[ship.name].component}
      </div>
      {ship.coordinates.map((coordinate) => (
        <div
          key={`${coordinate[0]}-${coordinate[1]}`}
          className="w-12 h-12 border border-border bg-ship-cell bg-opacity-100 group-hover:bg-ship-cell-hover cursor-pointer"
        ></div>
      ))}
    </motion.button>
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
  const nonShipCells = helpers.generateNonShipCells(shipNames, gameBoard);

  const gridTemplateAreas = `'${helpers.generateGridTemplate(
    shipNames,
    gameBoard
  )}'`;

  return (
    <motion.div
      className="z-10 relative flex flex-col items-center"
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
      <h2 className="mb-2 text-3xl font-bold">{playerName}</h2>
      <div
        className="grid"
        style={{
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
      <h2 className="mb-2 text-3xl font-bold">Ships</h2>
      <div className="w-[480px] h-[480px] p-8 flex flex-col items-start border border-border bg-cell">
        {unPlacedShips.map((ship) => (
          <div
            key={ship.name}
            className="relative mb-8 flex justify-center items-center hover:cursor-pointer group"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, ship)}
          >
            <button
              className={shipIcons[ship.name]["horizontal"]}
              onClick={() => {}}
            >
              {shipIcons[ship.name].component}
            </button>
            {[...Array(ship.length).keys()].map((index) => (
              <div
                key={`${ship.name}-${index}`}
                className="w-12 h-12 border border-border bg-ship-cell group-hover:bg-ship-cell-hover"
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
