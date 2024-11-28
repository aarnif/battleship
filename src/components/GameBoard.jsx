const Cell = ({ playerName, shipNames, content, y, x, handleClickCell }) => {
  const bgColor =
    shipNames.includes(content) && playerName === "Player"
      ? "grey"
      : content === "miss"
      ? "red"
      : content === "hit"
      ? "green"
      : "white";

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      key={`${y}-${x}`}
      id={`${y}-${x}`}
      style={{
        backgroundColor: bgColor,
        cursor: handleClickCell ? "pointer" : "default",
      }}
      className="w-12 h-12 border border-black"
    ></button>
  );
};

const Ship = ({ playerName, ship, shipNames, handleClickCell }) => {
  return (
    <div
      style={{
        gridArea: ship.name,
        display: "flex",
        flexDirection: ship.position === "horizontal" ? "column" : "row",
      }}
      draggable={playerName === "Player" ? true : false}
    >
      {ship.coordinates.map((coordinate) => (
        <Cell
          key={`${coordinate[0]}-${coordinate[1]}`}
          playerName={playerName}
          shipNames={shipNames}
          x={coordinate[0]}
          y={coordinate[1]}
          content={ship.name}
          handleClickCell={handleClickCell}
        />
      ))}
    </div>
  );
};

const GameBoardComponent = ({
  playerName,
  gameBoard,
  ships,
  shipNames,
  handleClickCell = null,
}) => {
  const generateGridTemplate = (array) => {
    return array
      .map((row) =>
        row.map((cell) => (shipNames.includes(cell) ? cell : ".")).join(" ")
      )
      .join("'\n'");
  };

  const freeCells = gameBoard
    .map((row, x) => row.map((cell, y) => cell === null && [x, y]))
    .flat()
    .filter((cell) => cell !== false);

  const gridTemplateAreas = `'${generateGridTemplate(gameBoard)}'`;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: gridTemplateAreas,
      }}
    >
      {ships.map((ship) => (
        <Ship
          key={ship.name}
          playerName={playerName}
          ship={ship}
          shipNames={shipNames}
          handleClickCell={handleClickCell}
        />
      ))}
      {freeCells.map((cell) => (
        <Cell
          key={`${cell[0]}-${cell[1]}`}
          playerName={playerName}
          shipNames={shipNames}
          x={cell[0]}
          y={cell[1]}
          content={null}
          handleClickCell={handleClickCell}
        />
      ))}
    </div>
  );
};

const GameBoard = ({
  playerName,
  gameBoard,
  ships,
  handleClickCell = null,
}) => {
  const shipNames = ships.map((ship) => ship.name);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">{playerName}</h2>
      <GameBoardComponent
        playerName={playerName}
        gameBoard={gameBoard}
        ships={ships}
        shipNames={shipNames}
        handleClickCell={handleClickCell}
      />
    </div>
  );
};

export default GameBoard;
