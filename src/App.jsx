import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Player from "../classes/Player.js";
import Ai from "../classes/Ai.js";
import Header from "./components/Header.jsx";
import GameText from "./components/GameText.jsx";
import PlaceShips from "./components/PlaceShips.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOverModal from "./components/GameOverModal.jsx";
import GameButton from "./components/GameButton.jsx";
import Footer from "./components/Footer.jsx";

const player = new Player("Player");
const ai = new Ai("Computer");

const App = () => {
  const [rounds, setRounds] = useState(1);
  const [playerName, setPlayerName] = useState(player.name);
  const [aiName, setAiName] = useState(ai.name);
  const [playerGameBoard, setPlayerGameBoard] = useState(player.getBoard());
  const [aiGameBoard, setAiGameBoard] = useState(ai.getBoard());
  const [clickedCells, setClickedCells] = useState([]);
  const [areAllShipsPlaced, setAreAllShipsPlaced] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");

  const handleClickNewGame = () => {
    console.log("Starting new game...");
    ai.gameBoard.placeShipsRandomly();
    setPlayerGameBoard(player.getBoard());
    setAiGameBoard(ai.getBoard());
    setRounds(1);
    setClickedCells([]);
    setIsGameOn(true);
  };

  const checkIfGameOver = (player, ai) => {
    if (player.gameBoard.allShipsSunk() && ai.gameBoard.allShipsSunk()) {
      console.log("It's a tie!");
      setGameOverMessage("It's a tie!");
      return true;
    } else if (ai.gameBoard.allShipsSunk()) {
      console.log("Player wins!");
      setGameOverMessage("Player wins!");
      return true;
    } else if (player.gameBoard.allShipsSunk()) {
      console.log("Computer wins!");
      setGameOverMessage("Computer wins!");
      return true;
    }
    return false;
  };

  const checkIfCellIsClicked = (x, y) => {
    return clickedCells.some((cell) => cell[0] === x && cell[1] === y);
  };

  const handleClickCell = (x, y) => {
    if (checkIfCellIsClicked(x, y)) {
      console.log(`Cell ${x}, ${y} is already clicked.`);
      return;
    }

    console.log(`Clicked ${x}, ${y}`);
    player.makeMove(ai.gameBoard, [x, y]);
    ai.makeMove(player.gameBoard);

    if (checkIfGameOver(player, ai)) {
      console.log(`Game lasted ${rounds} rounds.`);
      setShowGameOverModal(true);
    }

    setRounds((prevState) => prevState + 1);
    setPlayerGameBoard(player.getBoard());
    setAiGameBoard(ai.getBoard());
    setClickedCells((prevState) => [...prevState, [x, y]]);
  };

  const handleClickRestartGame = () => {
    player.gameBoard.reset();
    ai.gameBoard.reset();
    setPlayerGameBoard(player.getBoard());
    setIsGameOn(false);
    setAreAllShipsPlaced(false);
    setShowGameOverModal(false);
  };

  const handlePlaceShip = (e, setBgColor) => {
    e.preventDefault();
    const shipName = e.dataTransfer.getData("ship-name");
    const shipPosition = e.dataTransfer.getData("ship-position");
    const [x, y] = e.target.id.split("-").map(Number);

    if (player.gameBoard.placeShipManually(shipName, [x, y], shipPosition)) {
      setPlayerGameBoard(player.getBoard());
      console.log("Ship placed successfully.");
      if (player.gameBoard.ships.length === player.gameBoard.shipTypes.length) {
        console.log("All ships are placed on the board.");
        setAreAllShipsPlaced(true);
      }
    } else {
      console.log("Invalid move. Try again.");
      setBgColor("white");
    }
  };

  const handleChangeShipPosition = (shipName) => {
    const ship = player.gameBoard.ships.find((ship) => ship.name === shipName);
    const newShipPosition =
      ship.position === "horizontal" ? "vertical" : "horizontal";

    if (
      player.gameBoard.placeShipManually(
        shipName,
        ship.coordinates[0],
        newShipPosition
      )
    ) {
      setPlayerGameBoard(player.getBoard());
      console.log("Ship placed successfully.");
    } else {
      console.log("Invalid move. Try again.");
    }
  };

  const handlePlaceShipsRandomly = () => {
    player.gameBoard.reset();
    player.gameBoard.placeShipsRandomly();
    setPlayerGameBoard(player.getBoard());
    setAreAllShipsPlaced(true);
  };

  const playerGameBoardVariants = {
    initial: { opacity: 1, left: "50%", transform: "translateX(-50%)" },
    animate: { opacity: 1, left: 0, transform: "translateX(0)" },
    exit: { opacity: 1, left: "50%", transform: "translateX(-50%)" },
  };

  const computerGameBoardVariants = {
    initial: { opacity: 1, right: "50%", transform: "translateX(50%)" },
    animate: { opacity: 1, right: 0, transform: "translateX(0)" },
    exit: { opacity: 1, right: "50%", transform: "translateX(50%)" },
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-[1200px] flex-grow flex flex-col justify-center items-center">
        <GameText key="game-text" isGameOn={isGameOn} />
        <AnimatePresence mode="wait">
          {isGameOn ? (
            <motion.div
              key="game-mode"
              className="w-full flex justify-between items-center"
            >
              <GameBoard
                key="Player"
                playerName={playerName}
                gameBoard={playerGameBoard}
                ships={player.gameBoard.ships}
                variants={playerGameBoardVariants}
              />
              <GameBoard
                key="Computer"
                playerName={aiName}
                gameBoard={aiGameBoard}
                ships={ai.gameBoard.ships}
                handleClickCell={handleClickCell}
                variants={computerGameBoardVariants}
              />
            </motion.div>
          ) : (
            <motion.div
              key="place-ships-mode"
              className="w-full flex justify-between items-center"
            >
              <PlaceShips
                playerName={playerName}
                gameBoard={playerGameBoard}
                shipTypes={player.gameBoard.shipTypes}
                ships={player.gameBoard.ships}
                handlePlaceShip={handlePlaceShip}
                handleChangeShipPosition={handleChangeShipPosition}
                areAllShipsPlaced={areAllShipsPlaced}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <GameButton
          areAllShipsPlaced={areAllShipsPlaced}
          isGameOn={isGameOn}
          handleClickNewGame={handleClickNewGame}
          handleClickRestartGame={handleClickRestartGame}
          handlePlaceShipsRandomly={handlePlaceShipsRandomly}
        />

        {showGameOverModal && (
          <GameOverModal
            gameOverMessage={gameOverMessage}
            rounds={rounds}
            handleClickRestartGame={handleClickRestartGame}
          />
        )}
      </div>
      <div className="relative bottom-8">
        Ship Icons created by{" "}
        <a
          href="https://thenounproject.com/creator/usubaliev/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          <strong>usubaliev</strong>
        </a>{" "}
        from Noun Project
      </div>
      <Footer />
    </>
  );
};

export default App;
