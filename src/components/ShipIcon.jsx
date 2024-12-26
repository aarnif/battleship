import Carrier from "./Carrier";
import Battleship from "./Battleship";
import Cruiser from "./Cruiser";
import Submarine from "./Submarine";
import Destroyer from "./Destroyer";

const ShipIcon = ({ ship, position = ship.position }) => {
  const shipIconStyles = {
    isFloat: "w-full h-full object-cover fill-current text-ship-icon",
    isSunk: "w-full h-full object-cover fill-current text-ship-icon-sunk",
  };

  const shipIcons = {
    Carrier: {
      horizontal:
        "absolute cursor-pointer w-60 h-12 pointer-events-none animate-fade-in",
      vertical:
        "absolute rotate-90 cursor-pointer w-60 h-12 pointer-events-none animate-fade-in",
      component: (
        <Carrier
          className={
            ship.isSunk ? shipIconStyles.isSunk : shipIconStyles.isFloat
          }
        />
      ),
    },
    Battleship: {
      horizontal:
        "absolute text-ship-icon cursor-pointer w-full h-12 pointer-events-none animate-fade-in",
      vertical:
        "absolute text-ship-icon rotate-90 cursor-pointer w-48 h-12 pointer-events-none animate-fade-in",
      component: (
        <Battleship
          className={
            ship.isSunk ? shipIconStyles.isSunk : shipIconStyles.isFloat
          }
        />
      ),
    },
    Cruiser: {
      horizontal:
        "absolute cursor-pointer w-full h-12 pointer-events-none animate-fade-in",
      vertical:
        "absolute rotate-90 cursor-pointer w-36 h-12 pointer-events-none animate-fade-in",
      component: (
        <Cruiser
          className={
            ship.isSunk ? shipIconStyles.isSunk : shipIconStyles.isFloat
          }
        />
      ),
    },
    Submarine: {
      horizontal:
        "absolute cursor-pointer w-full h-12 pointer-events-none animate-fade-in",
      vertical:
        "absolute rotate-90 cursor-pointer w-36 h-12 pointer-events-none animate-fade-in",
      component: (
        <Submarine
          className={
            ship.isSunk ? shipIconStyles.isSunk : shipIconStyles.isFloat
          }
        />
      ),
    },
    Destroyer: {
      horizontal:
        "absolute cursor-pointer w-full h-12 pointer-events-none animate-fade-in",
      vertical:
        "absolute rotate-90 cursor-pointer w-24 h-12 pointer-events-none animate-fade-in",
      component: (
        <Destroyer
          className={
            ship.isSunk ? shipIconStyles.isSunk : shipIconStyles.isFloat
          }
        />
      ),
    },
  };

  return (
    <div className={shipIcons[ship.name][position]}>
      {shipIcons[ship.name].component}
    </div>
  );
};

export default ShipIcon;
