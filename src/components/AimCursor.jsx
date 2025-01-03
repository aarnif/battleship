import { useState, useEffect } from "react";
import { BsCrosshair } from "react-icons/bs";

const AimCursor = ({
  cursorWidth,
  cursorHeight,
  aimCursorCoordinates,
  aimCursorTarget,
}) => {
  const cursorStyles = {
    default: "w-10 h-10 fill-current text-aim-cursor",
    Carrier: "w-10 h-10 fill-current text-aim-cursor",
    Battleship: "w-10 h-10 fill-current text-aim-cursor",
    Cruiser: "w-10 h-10 fill-current text-aim-cursor",
    Submarine: "w-10 h-10 fill-current text-aim-cursor",
    Destroyer: "w-10 h-10 fill-current text-aim-cursor",
    hit: "w-10 h-10 fill-current text-aim-cursor-played",
    miss: "w-10 h-10 fill-current text-aim-cursor-played",
  };

  const cursorCenterStyles = {
    default: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    Carrier: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    Battleship: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    Cruiser: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    Submarine: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    Destroyer: "absolute w-2 h-2 bg-aim-cursor-center rounded-full",
    hit: "absolute w-2 h-2 bg-aim-cursor-center-played rounded-full",
    miss: "absolute w-2 h-2 bg-aim-cursor-center-played rounded-full",
  };

  const [cursorStyle, setCursorStyle] = useState(cursorStyles.default);
  const [cursorCenterStyle, setCursorCenterStyle] = useState(
    cursorCenterStyles.default
  );

  useEffect(() => {
    setCursorStyle(cursorStyles[aimCursorTarget]);
    setCursorCenterStyle(cursorCenterStyles[aimCursorTarget]);
  }, [aimCursorTarget]);

  return (
    <div
      className="z-50 absolute flex justify-center items-center cursor-none pointer-events-none"
      style={{
        width: cursorWidth,
        height: cursorHeight,
        top: aimCursorCoordinates.y,
        left: aimCursorCoordinates.x,
      }}
    >
      <BsCrosshair className={cursorStyle} />
      <div className={cursorCenterStyle}></div>
    </div>
  );
};

export default AimCursor;
