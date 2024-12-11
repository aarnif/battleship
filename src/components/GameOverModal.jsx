const GameOverModal = ({ gameOverMessage, rounds, handleClickRestartGame }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-overlay animate-scaleIn">
      <div className="p-8 w-[500px] flex flex-col justify-center items-center rounded-xl bg-modal animate-scaleIn">
        <h1 className="text-4xl font-extrabold my-4">Game Over!</h1>
        <h2 className="text-3xl font-bold mb-2">{gameOverMessage}</h2>
        <h3 className="text-2xl font-medium mb-8">
          Game lasted {rounds} rounds.
        </h3>

        <div className="flex justify-around w-full">
          <button
            className="p-8 flex-grow max-w-[300px] text-2xl font-bold bg-button 
         border-2 border-border rounded-xl hover:bg-button-hover active:scale-95 
         transition-all duration-200 ease-in-out"
            onClick={handleClickRestartGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
