const GameButton = ({
  areAllShipsPlaced,
  isGameOn,
  handleClickNewGame,
  handleClickRestartGame,
  handlePlaceShipsRandomly,
}) => {
  const buttonText = areAllShipsPlaced
    ? isGameOn
      ? "Restart Game"
      : "Start Game"
    : "Place Ships Randomly";

  const handleClick = areAllShipsPlaced
    ? isGameOn
      ? handleClickRestartGame
      : handleClickNewGame
    : handlePlaceShipsRandomly;

  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <button
        className="text-2xl font-bold"
        onClick={handleClick}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GameButton;
