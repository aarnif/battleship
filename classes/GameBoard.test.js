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
    gameBoard.placeShip("Carrier", [1, 1], "vertical");

    for (let i = 0; i < 2; i++) {
      gameBoard.receiveAttack([0, i]);
    }

    for (let i = 1; i < 3; i++) {
      gameBoard.receiveAttack([1, i]);
    }

    expect(gameBoard.allShipsSunk()).toBe(false);
  });

  test("All ships are sunk", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    gameBoard.placeShip("Carrier", [1, 1], "vertical");

    for (let i = 0; i < 2; i++) {
      gameBoard.receiveAttack([0, i]);
    }

    for (let i = 1; i < 6; i++) {
      gameBoard.receiveAttack([1, i]);
    }

    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});
