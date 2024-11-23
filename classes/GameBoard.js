class GameBoard {
  constructor(width = 10) {
    this.shipTypes = {
      Carrier: 5,
      Battleship: 4,
      Cruiser: 3,
      Submarine: 3,
      Destroyer: 2,
    };
    this.board = this.createBoard(width);
    this.latestHit = null;
  }

  createBoard(width) {
    let board = [];

    for (let i = 0; i < width; ++i) {
      const row = [];
      for (let j = 0; j < width; ++j) {
        row.push(null);
      }
      board.push(row);
    }

    return board;
  }

  mark(coordinates, shipType) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      this.board[x][y] = shipType;
    }
  }

  calculateCoordinates(startingCoordinates, shipPosition, shipLength) {
    const [x, y] = startingCoordinates;
    const coordinates = [];

    for (let i = 0; i < shipLength; ++i) {
      if (shipPosition === "horizontal") {
        coordinates.push([x + i, y]);
      } else if (shipPosition === "vertical") {
        coordinates.push([x, y + i]);
      }
    }

    return coordinates;
  }

  checkIfShipCoordinatesAreInBounds(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (x < 0 || x >= this.board.length || y < 0 || y >= this.board.length) {
        return false;
      }
    }
    return true;
  }

  checkIfGameBoardCellIsTaken(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (this.board[x][y]) {
        return false;
      }
    }
    return true;
  }

  placeShip(type, startingCoordinates, position = "horizontal") {
    const shipLength = this.shipTypes[type];

    const shipCoordinates = this.calculateCoordinates(
      startingCoordinates,
      position,
      shipLength
    );

    if (
      !this.checkIfShipCoordinatesAreInBounds(shipCoordinates) ||
      !this.checkIfGameBoardCellIsTaken(shipCoordinates)
    ) {
      return false;
    }

    this.mark(shipCoordinates, type);
    console.log("Place ship on board:", type);
    return true;
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    if (this.board[x][y] == "hit" || this.board[x][y] == "miss") {
      return false;
    }
    if (this.shipTypes[this.board[x][y]]) {
      this.board[x][y] = "hit";
    } else {
      this.board[x][y] = "miss";
    }
    this.latestHit = coordinates;
    return true;
  }

  allShipsSunk() {
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board.length; ++j) {
        if (this.shipTypes[this.board[i][j]]) {
          return false;
        }
      }
    }
    return true;
  }
}

export default GameBoard;
