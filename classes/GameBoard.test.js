import GameBoard from "./GameBoard.js";

describe("Test GameBoard-class", () => {
  test("Check if board is created", () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });

  test("Place ship on the board", () => {
    const gameBoard = new GameBoard(10);
    const placeShip = gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    expect(placeShip).toBe(true);
    expect(gameBoard.board[0][0]).toBe("Destroyer");
    expect(gameBoard.board[0][1]).toBe("Destroyer");
  });

  test("Try to place ship outside the board", () => {
    const gameBoard = new GameBoard(10);
    const placeShip = gameBoard.placeShip("Destroyer", [0, 10], "vertical");
    expect(placeShip).toBe(false);
  });

  test("Try to place ship on top of another ship", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    const placeShip = gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    expect(placeShip).toBe(false);
  });

  test("Place ships on the board randomly", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShipsRandomly();

    let carrierLength = 0;
    let battleshipLength = 0;
    let cruiserLength = 0;
    let submarineLength = 0;
    let destroyerLength = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (gameBoard.board[i][j] == "Carrier") {
          carrierLength++;
        } else if (gameBoard.board[i][j] == "Battleship") {
          battleshipLength++;
        } else if (gameBoard.board[i][j] == "Cruiser") {
          cruiserLength++;
        } else if (gameBoard.board[i][j] == "Submarine") {
          submarineLength++;
        } else if (gameBoard.board[i][j] == "Destroyer") {
          destroyerLength++;
        }
      }
    }

    expect(carrierLength).toBe(5);
    expect(battleshipLength).toBe(4);
    expect(cruiserLength).toBe(3);
    expect(submarineLength).toBe(3);
    expect(destroyerLength).toBe(2);
  });

  test("Place ships on the board with space between them", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShipsRandomly();

    const shipTypes = [
      "Carrier",
      "Battleship",
      "Cruiser",
      "Submarine",
      "Destroyer",
    ];

    let shipsArePlacedCorrectly = true;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (shipTypes.includes(gameBoard.board[i][j])) {
          const otherShips = shipTypes.filter(
            (ship) => ship !== gameBoard.board[i][j]
          );

          if (i > 0 && otherShips.includes(gameBoard.board[i - 1][j])) {
            shipsArePlacedCorrectly = false;
          }

          if (i < 9 && otherShips.includes(gameBoard.board[i + 1][j])) {
            shipsArePlacedCorrectly = false;
          }

          if (j > 0 && otherShips.includes(gameBoard.board[i][j - 1])) {
            shipsArePlacedCorrectly = false;
          }

          if (j < 9 && otherShips.includes(gameBoard.board[i][j + 1])) {
            shipsArePlacedCorrectly = false;
          }
        }
      }
    }

    console.table(gameBoard.board);

    expect(shipsArePlacedCorrectly).toBe(true);
  });

  test("Receive attack on empty cell", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.board[0][0]).toBe("miss");
  });

  test("Receive attack on ship", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.board[0][0]).toBe("hit");
  });

  test("Tracks the latest hit", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    expect(gameBoard.latestHit).toEqual(null);
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.latestHit).toEqual([0, 0]);
    gameBoard.receiveAttack([0, 1]);
    expect(gameBoard.latestHit).toEqual([0, 1]);
  });

  test("Try to hit the same cell twice", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    gameBoard.receiveAttack([0, 0]);
    expect(gameBoard.board[0][0]).toBe("hit");
    expect(gameBoard.receiveAttack([0, 0])).toBe(false);
  });

  test("All ships are not sunk", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    gameBoard.placeShip("Carrier", [3, 3], "vertical");

    for (let i = 0; i < 2; i++) {
      gameBoard.receiveAttack([0, i]);
    }

    for (let i = 3; i < 5; i++) {
      gameBoard.receiveAttack([3, i]);
    }

    expect(gameBoard.allShipsSunk()).toBe(false);
  });

  test("All ships are sunk", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    gameBoard.placeShip("Carrier", [3, 3], "vertical");

    for (let i = 0; i < 2; i++) {
      gameBoard.receiveAttack([0, i]);
    }

    for (let i = 3; i < 9; i++) {
      gameBoard.receiveAttack([3, i]);
    }

    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});
