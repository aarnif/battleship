const Cell = ({
  playerName,
  shipNames,
  content,
  y,
  x,
  handleClickCell,
  handlePlaceShip,
}) => {
  const bgColor =
    shipNames.includes(content) && playerName === "Player"
      ? "grey"
      : content === "miss"
      ? "red"
      : content === "hit"
      ? "green"
      : "white";

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      onDrag={handlePlaceShip ? (e) => e.preventDefault() : null}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handlePlaceShip ? (e) => handlePlaceShip(e) : null}
      data-shipname={content}
      key={`${x}-${y}`}
      id={`${x}-${y}`}
      style={{
        backgroundColor: bgColor,
        cursor: handleClickCell ? "pointer" : "default",
      }}
      className="w-12 h-12 border border-black"
    ></button>
  );
};

export default Cell;
