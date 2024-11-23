import GameBoard from "./GameBoard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard(10);
  }

  makeMove(opponentGameBoard, coordinates) {
    return opponentGameBoard.receiveAttack(coordinates);
  }

  getBoard() {
    return this.gameBoard.board;
  }
}

export default Player;
