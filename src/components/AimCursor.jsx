import { BiCross } from "react-icons/bi";

const AimCursor = ({ cursorWidth, cursorHeight, aimCoordinates }) => {
  return (
    <div
      className="z-50 absolute flex justify-center items-center cursor-none pointer-events-none"
      style={{
        width: cursorWidth,
        height: cursorHeight,
        top: aimCoordinates.y,
        left: aimCoordinates.x,
      }}
    >
      <BiCross className="w-10 h-10 fill-current text-aim-cursor" />
    </div>
  );
};

export default AimCursor;
