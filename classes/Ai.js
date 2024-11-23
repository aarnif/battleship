import Player from "./Player.js";

class Ai extends Player {
  constructor(name) {
    super(name);
    this.latestMove = null;
  }

  checkIfMoveIsLegal(gameBoard, x, y) {
    return (
      x >= 0 &&
      x < gameBoard.board.length &&
      y >= 0 &&
      y < gameBoard.board.length &&
      gameBoard.board[x][y] !== "miss" &&
      gameBoard.board[x][y] !== "hit"
    );
  }

  makeAiMove(gameBoard) {
    while (true) {
      const x = Math.floor(Math.random() * gameBoard.board.length);
      const y = Math.floor(Math.random() * gameBoard.board.length);

      if (this.checkIfMoveIsLegal(gameBoard, x, y)) {
        this.latestMove = [x, y];
        return gameBoard.receiveAttack([x, y]);
      }
    }
  }
}

export default Ai;
