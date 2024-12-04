import { useState, useRef } from "react";

import Player from "../classes/Player.js";
import Ai from "../classes/Ai.js";
import PlaceShips from "./components/PlaceShips.jsx";
import GameBoard from "./components/GameBoard.jsx";

const player = new Player("Player");
const ai = new Ai("Computer");

const App = () => {
  const newGameRef = useRef(null);
  const [rounds, setRounds] = useState(1);
  const [playerName, setPlayerName] = useState(player.name);
  const [aiName, setAiName] = useState(ai.name);
  const [playerGameBoard, setPlayerGameBoard] = useState(player.getBoard());
  const [aiGameBoard, setAiGameBoard] = useState(ai.getBoard());
  const [clickedCells, setClickedCells] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
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
      newGameRef.current.showModal();
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
    newGameRef.current.close();
  };

  const handlePlaceShip = (e, setBgColor) => {
    e.preventDefault();
    const shipName = e.dataTransfer.getData("ship-name");
    const shipPosition = e.dataTransfer.getData("ship-position");
    const [x, y] = e.target.id.split("-").map(Number);

    if (player.gameBoard.placeShipManually(shipName, [x, y], shipPosition)) {
      setPlayerGameBoard(player.getBoard());
      console.log("Ship placed successfully.");
    } else {
      console.log("Invalid move. Try again.");
      setBgColor("white");
    }
  };

  const handleChangeShipPosition = (e) => {
    const shipName = e.target.getAttribute("data-shipname");
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

  return (
    <div className="w-full max-w-[1200px] flex-grow flex flex-col items-center">
      {isGameOn ? (
        <div className="w-full flex-grow flex justify-between items-center">
          <GameBoard
            key={"Player"}
            playerName={playerName}
            gameBoard={playerGameBoard}
            ships={player.gameBoard.ships}
          />
          <GameBoard
            key={"Computer"}
            playerName={aiName}
            gameBoard={aiGameBoard}
            ships={ai.gameBoard.ships}
            handleClickCell={handleClickCell}
          />
        </div>
      ) : (
        <>
          <div className="w-full flex-grow flex justify-between items-center">
            <PlaceShips
              playerName={playerName}
              gameBoard={playerGameBoard}
              shipTypes={player.gameBoard.shipTypes}
              ships={player.gameBoard.ships}
              handlePlaceShip={handlePlaceShip}
              handleChangeShipPosition={handleChangeShipPosition}
            />
          </div>
        </>
      )}
      <div className="w-full flex-grow flex justify-center items-center">
        <button
          className="text-2xl font-bold"
          onClick={isGameOn ? handleClickRestartGame : handleClickNewGame}
        >
          {isGameOn ? "Restart Game" : "Start Game"}
        </button>
      </div>
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
    </div>
  );
};

export default App;
