import Player from "./Player.js";

class Ai extends Player {
  constructor(name) {
    super(name);
    this.latestMove = null;
    this.targetCoordinates = [];
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

  getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  makeAiMove(gameBoard) {
    while (true) {
      let x, y;
      if (this.targetCoordinates.length) {
        [x, y] = this.targetCoordinates.pop();
      } else {
        [x, y] = this.getRandomCoordinates();
      }

      if (
        this.latestMove &&
        gameBoard.board[this.latestMove[0]][this.latestMove[1]] === "hit"
      ) {
        const potentialTargets = [
          [this.latestMove[0] - 1, this.latestMove[1]],
          [this.latestMove[0] + 1, this.latestMove[1]],
          [this.latestMove[0], this.latestMove[1] - 1],
          [this.latestMove[0], this.latestMove[1] + 1],
        ];
        this.targetCoordinates = potentialTargets.filter((targetCoordinate) =>
          this.checkIfMoveIsLegal(
            gameBoard,
            targetCoordinate[0],
            targetCoordinate[1]
          )
        );
      }

      if (this.checkIfMoveIsLegal(gameBoard, x, y)) {
        this.latestMove = [x, y];
        return gameBoard.receiveAttack([x, y]);
      }
    }
  }
}

export default Ai;
