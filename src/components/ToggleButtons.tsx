type DirectionOptions = "NORTH" | "SOUTH" | "EAST" | "WEST";

type ToggleButtonsProps = {
  selected: DirectionOptions | null;
  onChange: (option: DirectionOptions) => void;
};

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  selected,
  onChange,
}) => {
  const handleButtonClick = (option: DirectionOptions) => {
    onChange(option);
  };

  return (
    <div>
      <button
        className={selected === "NORTH" ? "selected" : ""}
        onClick={() => handleButtonClick("NORTH")}
      >
        NORTH
      </button>
      <button
        className={selected === "SOUTH" ? "selected" : ""}
        onClick={() => handleButtonClick("SOUTH")}
      >
        SOUTH
      </button>
      <button
        className={selected === "EAST" ? "selected" : ""}
        onClick={() => handleButtonClick("EAST")}
      >
        EAST
      </button>
      <button
        className={selected === "WEST" ? "selected" : ""}
        onClick={() => handleButtonClick("WEST")}
      >
        WEST
      </button>
    </div>
  );
};
