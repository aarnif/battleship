const GameText = ({ isGameOn }) => {
  return (
    <div
      key={!isGameOn ? "place-ships" : "game-mode"}
      className="min-h-[120px] flex flex-col justify-start items-center text-center animate-scale-in"
    >
      {!isGameOn ? (
        <>
          <p className="mb-2 text-xl font-semibold">
            Drag and drop your ships onto the gameboard.
          </p>
          <p className="mb-2 text-xl font-semibold">
            Rotate them with a left-click.
          </p>
          <p className="mb-2 text-xl font-semibold">
            After placing a ship on the board, you can still move and rotate it.
          </p>
        </>
      ) : (
        <>
          <p className="mb-2 text-xl font-semibold">Aim at Computers grid.</p>
          <p className="mb-2 text-xl font-semibold">
            Left-click a cell to attack.
          </p>
          <p className="mb-2 text-xl font-semibold">
            Sink all five ships to win!
          </p>
        </>
      )}
    </div>
  );
};

export default GameText;
