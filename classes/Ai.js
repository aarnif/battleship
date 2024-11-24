import Player from "./Player.js";

class Ai extends Player {
  constructor(name) {
    super(name);
    this.latestMove = null;
    this.targetCoordinates = [];
  }

  makeMove(gameBoard) {
    while (true) {
      let x, y;
      if (this.targetCoordinates.length) {
        [x, y] = this.targetCoordinates.pop();
      } else {
        [x, y] = this.getRandomCoordinates(gameBoard);
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
