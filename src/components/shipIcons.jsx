import Carrier from "./Carrier";
import Battleship from "./Battleship";
import Cruiser from "./Cruiser";
import Submarine from "./Submarine";
import Destroyer from "./Destroyer";

const shipIcons = {
  Carrier: {
    horizontal: "absolute cursor-pointer w-60 h-12 pointer-events-none",
    vertical: "absolute rotate-90 cursor-pointer w-60 h-12 pointer-events-none",
    component: (
      <Carrier className="w-full h-full object-cover fill-current text-ship-icon" />
    ),
  },
  Battleship: {
    horizontal:
      "absolute text-ship-icon cursor-pointer w-full h-12 pointer-events-none",
    vertical:
      "absolute text-ship-icon rotate-90 cursor-pointer w-48 h-12 pointer-events-none",
    component: (
      <Battleship className="w-full h-full object-cover fill-current text-ship-icon" />
    ),
  },
  Cruiser: {
    horizontal: "absolute cursor-pointer w-full h-12 pointer-events-none",
    vertical: "absolute rotate-90 cursor-pointer w-36 h-12 pointer-events-none",
    component: (
      <Cruiser className="w-full h-full object-cover fill-current text-ship-icon" />
    ),
  },
  Submarine: {
    horizontal: "absolute cursor-pointer w-full h-12 pointer-events-none",
    vertical: "absolute rotate-90 cursor-pointer w-36 h-12 pointer-events-none",
    component: (
      <Submarine className="w-full h-full object-cover fill-current text-ship-icon" />
    ),
  },
  Destroyer: {
    horizontal: "absolute cursor-pointer w-full h-12 pointer-events-none",
    vertical: "absolute rotate-90 cursor-pointer w-24 h-12 pointer-events-none",
    component: (
      <Destroyer className="w-full h-full object-cover fill-current text-ship-icon" />
    ),
  },
};

export default shipIcons;
