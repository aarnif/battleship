import Cell from "./Cell";

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
    </div>
  );
};

export default GameBoard;
