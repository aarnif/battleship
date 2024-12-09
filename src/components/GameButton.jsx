import { motion } from "framer-motion";

import tailwindConfig from "../../tailwind.config";

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
      <motion.button
        key={buttonText}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{
          backgroundColor: tailwindConfig.theme.extend.colors.button.hover,
        }}
        whileTap={{ scale: 0.95 }}
        className="p-8 flex-grow max-w-[400px] text-2xl font-bold bg-button border-2 border-border rounded-xl"
        onClick={handleClick}
      >
        {buttonText}
      </motion.button>
    </div>
  );
};

export default GameButton;
