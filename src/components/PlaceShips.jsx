import Cell from "./Cell";

const ShipPlacementBoard = ({
  playerName,
  gameBoard,
  ships,
  shipNames,
  handleDragStart,
  handlePlaceShip,
  handleClickCell,
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
          <div
            key={ship.name}
            style={{
              gridArea: ship.name,
              display: "flex",
              flexDirection: ship.position === "horizontal" ? "row" : "column",
            }}
            draggable={playerName === "Player" ? true : false}
            onDragStart={(e) => handleDragStart(e, ship)}
            onClick={handleChangeShipPosition}
          >
            {ship.coordinates.map((coordinate) => (
              <Cell
                key={`${coordinate[0]}-${coordinate[1]}`}
                playerName={playerName}
                shipNames={shipNames}
                content={ship.name}
                x={coordinate[0]}
                y={coordinate[1]}
                handleClickCell={handleClickCell}
                handlePlaceShip={handlePlaceShip}
              />
            ))}
          </div>
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
  handleClickCell = null,
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
        handleClickCell={handleClickCell}
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
