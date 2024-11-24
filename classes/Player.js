import GameBoard from "./GameBoard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard(10);
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

  getRandomCoordinates(gameBoard) {
    while (true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      if (this.checkIfMoveIsLegal(gameBoard, x, y)) {
        return [x, y];
      }
    }
  }

  makeMove(opponentGameBoard, coordinates = null) {
    if (!coordinates) {
      coordinates = this.getRandomCoordinates(opponentGameBoard);
    }
    return opponentGameBoard.receiveAttack(coordinates);
  }

  getBoard() {
    return this.gameBoard.board;
  }
}

export default Player;
