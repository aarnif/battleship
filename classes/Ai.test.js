import Player from "./Player.js";
import Ai from "./Ai.js";

describe("Test Ai-class", () => {
  test("Ai has name", () => {
    const ai = new Ai("Ai");
    expect(ai.name).toBe("Ai");
  });

  test("Ai makes a move within gameboard", () => {
    const ai = new Ai("Ai");
    const player = new Player("Player");

    ai.makeAiMove(player.gameBoard);
    expect(player.getBoard()[ai.latestMove[0]][ai.latestMove[1]]).toEqual(
      "miss"
    );
  });

  test("Ai makes only legal moves", () => {
    const ai = new Ai("Ai");
    const player = new Player("Player");

    player.gameBoard.placeShipsRandomly();

    let moves = 0;

    while (!player.gameBoard.allShipsSunk()) {
      ai.makeAiMove(player.gameBoard);
      moves++;
    }

    expect(moves).toBeLessThan(101);
  });
});
