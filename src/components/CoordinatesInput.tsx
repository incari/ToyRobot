export type Position = {
  x: number;
  y: number;
};

type ChangeCoord = {
  onChange: (axis: "x" | "y", value: number) => void;
  maxX: number;
  maxY: number;
  xValue: number;
  yValue: number;
};

export const CoordinatesInput = ({
  onChange,
  maxX,
  maxY,
  xValue = 0,
  yValue = 0,
}: ChangeCoord) => {
  const handleCoordinatesChange = (axis: "x" | "y", value: string) => {
    let parsedValue = parseInt(value, 10) || 0;

    // Apply constraints based on the axis
    if (axis === "x") {
      parsedValue = Math.min(parsedValue, maxX);
    } else if (axis === "y") {
      parsedValue = Math.min(parsedValue, maxY);
    }

    onChange(axis, parsedValue);
  };
  return (
    <div className="coordinates-input">
      <div>
        <label className="input-label">X:</label>
        <input
          className="input-field"
          value={xValue}
          type="number"
          onChange={(e) => handleCoordinatesChange("x", e.target.value)}
          min={0}
          max={maxX}
        />
      </div>
      <div>
        <label className="input-label">Y:</label>
        <input
          className="input-field"
          value={yValue}
          type="number"
          onChange={(e) => handleCoordinatesChange("y", e.target.value)}
          min={0}
          max={maxY}
        />
      </div>
    </div>
  );
};

export default CoordinatesInput;
