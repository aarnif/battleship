const Cell = ({ playerName, content, y, x, handleClickCell }) => {
  const shipNames = [
    "Carrier",
    "Battleship",
    "Cruiser",
    "Submarine",
    "Destroyer",
  ];

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

const GameBoard = ({ playerName, gameBoard, handleClickCell = null }) => {
  return (
    <div className="grid grid-cols-10 grid-rows-10">
      {gameBoard.map((row, x) =>
        row.map((content, y) => (
          <Cell
            key={`${x}-${y}`}
            playerName={playerName}
            content={content}
            x={x}
            y={y}
            handleClickCell={handleClickCell}
          />
        ))
      )}
    </div>
  );
};

const GameBoardComponent = ({
  playerName,
  gameBoard,
  handleClickCell = null,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">{playerName}</h2>
      <GameBoard
        playerName={playerName}
        gameBoard={gameBoard}
        handleClickCell={handleClickCell}
      />
    </div>
  );
};

export default GameBoardComponent;
