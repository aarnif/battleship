const GameOverModal = ({
  newGameRef,
  gameOverMessage,
  rounds,
  handleClickRestartGame,
}) => {
  return (
    <dialog ref={newGameRef}>
      <div className="w-[500px] h-[280px] bg-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-2">Game Over!</h1>
        <h2 className="text-2xl mb-2">{gameOverMessage}</h2>
        <h3 className="text-2xl mb-2">Game lasted {rounds} rounds.</h3>

        <div className="flex justify-around w-full">
          <button
            className="text-2xl font-bold"
            onClick={handleClickRestartGame}
          >
            New Game
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default GameOverModal;
