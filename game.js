import Player from "./classes/Player.js";
import Ai from "./classes/Ai.js";

const checkIfGameOver = (player, ai) => {
  if (player.gameBoard.allShipsSunk() && ai.gameBoard.allShipsSunk()) {
    console.log("It's a tie!");
    return true;
  } else if (ai.gameBoard.allShipsSunk()) {
    console.log("Player wins!");
    return true;
  } else if (player.gameBoard.allShipsSunk()) {
    console.log("Ai wins!");
    return true;
  }
  return false;
};

const game = () => {
  let rounds = 1;
  const player = new Player();
  const ai = new Ai();

  player.gameBoard.placeShipsRandomly();
  ai.gameBoard.placeShipsRandomly();

  while (true) {
    if (checkIfGameOver(player, ai)) {
      console.log(`Game lasted ${rounds} rounds.`);
      break;
    }

    player.makeMove(ai.gameBoard);
    ai.makeMove(player.gameBoard);
    rounds++;
  }
};

game();
