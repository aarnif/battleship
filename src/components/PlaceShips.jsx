import { useState, useEffect } from "react";

const FreeCell = ({ shipNames, content, y, x, handlePlaceShip }) => {
  const [bgColor, setBgColor] = useState("white");

  const changeBgColor = () => {
    if (shipNames.includes(content)) {
      setBgColor("gray");
    } else {
      setBgColor("white");
    }
  };

  useEffect(() => {
    changeBgColor();
  }, [content]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setBgColor("gray");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (shipNames.includes(content)) {
      setBgColor("gray");
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

const ShipPlacementBoard = ({
  playerName,
  gameBoard,
  ships,
  shipNames,
  handleDragStart,
  handlePlaceShip,
  handleChangeShipPosition,
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
    <div className="flex flex-col items-center">
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
    </div>
  );
};

const ShipsContainer = ({ shipTypes, shipNames, handleDragStart }) => {
  const unPlacedShips = shipTypes.filter(
    (ship) => !shipNames.includes(ship.name)
  );

  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
};

const PlaceShips = ({
  playerName,
  gameBoard,
  shipTypes,
  ships,
  handlePlaceShip,
  handleChangeShipPosition,
}) => {
  const shipNames = ships.map((ship) => ship.name);

  const handleDragStart = (event, ship) => {
    event.dataTransfer.setData("ship-name", ship.name);
    event.dataTransfer.setData("ship-position", ship.position);
  };

  return (
    <div className="flex-grow flex justify-between items-center">
      <ShipPlacementBoard
        playerName={playerName}
        gameBoard={gameBoard}
        ships={ships}
        shipNames={shipNames}
        handleDragStart={handleDragStart}
        handlePlaceShip={handlePlaceShip}
        handleChangeShipPosition={handleChangeShipPosition}
      />
      <ShipsContainer
        shipTypes={shipTypes}
        shipNames={shipNames}
        handleDragStart={handleDragStart}
      />
    </div>
  );
};

export default PlaceShips;
