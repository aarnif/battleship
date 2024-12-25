const generateGridTemplate = (shipNames, gameBoard) =>
  gameBoard
    .map((row) =>
      row.map((cell) => (shipNames.includes(cell) ? cell : ".")).join(" ")
    )
    .join("'\n'");

const generateNonShipCells = (shipNames, gameBoard) =>
  gameBoard
    .map((row, x) => row.map((cell, y) => !shipNames.includes(cell) && [x, y]))
    .flat()
    .filter((cell) => cell !== false);

export default { generateGridTemplate, generateNonShipCells };
