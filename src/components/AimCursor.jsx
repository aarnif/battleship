import { BiCross } from "react-icons/bi";

const AimCursor = ({
  cursorWidth,
  cursorHeight,
  aimCursorCoordinates,
  aimCursorTarget,
}) => {
  const classStyles = {
    default: "w-10 h-10 fill-current text-aim-cursor",
    Carrier: "w-10 h-10 fill-current text-aim-cursor",
    Battleship: "w-10 h-10 fill-current text-aim-cursor",
    Cruiser: "w-10 h-10 fill-current text-aim-cursor",
    Submarine: "w-10 h-10 fill-current text-aim-cursor",
    Destroyer: "w-10 h-10 fill-current text-aim-cursor",
    hit: "w-10 h-10 fill-current text-aim-cursor-played",
    miss: "w-10 h-10 fill-current text-aim-cursor-played",
  };

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
      <BiCross className={classStyles[aimCursorTarget]} />
    </div>
  );
};

export default AimCursor;
