import Player from "./Player.js";

describe("Test Player-class", () => {
  test("Player has name", () => {
    const player1 = new Player("Player 1");
    expect(player1.name).toBe("Player 1");
  });

  test("Player can make a move that misses", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player1.makeMove(player2.gameBoard, [0, 0]);
    expect(player2.getBoard()[0][0]).toEqual("miss");
  });

  test("Player can make a move that hits", () => {
    const player1 = new Player("Player 1");
    const player2 = new Player("Player 2");

    player1.gameBoard.placeShip("Destroyer", [0, 0], "vertical");
    player2.gameBoard.placeShip("Destroyer", [0, 0], "vertical");

    player1.makeMove(player2.gameBoard, [0, 0]);
    player2.makeMove(player1.gameBoard, [0, 0]);

    expect(player1.getBoard()[0][0]).toEqual("hit");
    expect(player2.getBoard()[0][0]).toEqual("hit");
  });
});
