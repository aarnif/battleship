import { useState, useEffect } from "react";

const Cell = ({
  playerName,
  shipNames,
  content,
  y,
  x,
  handleClickCell,
  handlePlaceShip,
}) => {
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    if (shipNames.includes(content) && playerName === "Player") {
      setBgColor("gray");
    } else if (content === "miss") {
      setBgColor("red");
    } else if (content === "hit") {
      setBgColor("green");
    } else {
      setBgColor("white");
    }
  }, [content]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setBgColor("gray");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (shipNames.includes(content)) {
      setBgColor("gray");
    } else {
      setBgColor("white");
    }
  };

  return (
    <button
      onClick={handleClickCell ? () => handleClickCell(x, y) : null}
      onDrag={handlePlaceShip ? (e) => e.preventDefault() : null}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handlePlaceShip ? (e) => handlePlaceShip(e, setBgColor) : null}
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
