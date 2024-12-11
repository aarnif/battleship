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
    <div className="mt-12 w-full flex justify-center items-center">
      <button
        key={buttonText}
        className="p-8 flex-grow max-w-[400px] text-2xl font-bold bg-button 
         border-2 border-border rounded-xl hover:bg-button-hover active:scale-95 transition-all duration-200 ease-in-out animate-scale-in"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GameButton;
