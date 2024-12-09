import { motion } from "framer-motion";

import tailwindConfig from "../../tailwind.config";

const GameOverModal = ({ gameOverMessage, rounds, handleClickRestartGame }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="p-8 w-[500px] flex flex-col justify-center items-center rounded-xl bg-modal ">
        <h1 className="text-3xl font-extrabold my-4">Game Over!</h1>
        <h2 className="text-2xl font-medium mb-2">{gameOverMessage}</h2>
        <h3 className="text-2xl font-medium mb-8">
          Game lasted {rounds} rounds.
        </h3>

        <div className="flex justify-around w-full">
          <motion.button
            transition={{ duration: 0.2 }}
            whileHover={{
              backgroundColor: tailwindConfig.theme.extend.colors.button.hover,
            }}
            whileTap={{ scale: 0.95 }}
            className="p-8 flex-grow max-w-[300px] text-2xl font-bold bg-button rounded-xl"
            onClick={handleClickRestartGame}
          >
            New Game
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
