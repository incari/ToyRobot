import React, { useState } from "react";
import { Position, SelectedDirection } from "../App";

type RobotControllerProps = {
  instructions: string[];
  BOARD_SIZE_X: number;
  BOARD_SIZE_Y: number;
};
type Report = {
  position: {
    x: number;
    y: number;
  };
  direction: SelectedDirection;
};
export const RobotController: React.FC<RobotControllerProps> = ({
  instructions,
  BOARD_SIZE_X,
  BOARD_SIZE_Y,
}) => {
  const [report, setReport] = useState<null | Report>(null);

  const processInstructions = () => {
    let newPosition = { x: 0, y: 0 };
    let newDirection: SelectedDirection = "NORTH";

    instructions.forEach((instruction, index) => {
      if (instruction.startsWith("PLACE")) {
        const [, position] = instruction.split(" ");
        const initialPositions = position.split(",");

        if (initialPositions.length === 3) {
          const [x, y, direction] = initialPositions;
          // Check that the direction is valid
          if (["NORTH", "EAST", "SOUTH", "WEST"].includes(direction)) {
            newPosition = { x: parseInt(x), y: parseInt(y) };
            newDirection = direction as SelectedDirection;
          }
        }
      }
      if (index !== 0) {
        switch (instruction) {
          case "MOVE":
            newPosition = move(newPosition, newDirection);
            break;
          case "RIGHT":
            newDirection = rotate(newDirection, instruction);
            break;
          case "LEFT":
            newDirection = rotate(newDirection, instruction);
            break;
          default:
            console.log("Invalid instruction");
        }
      }
    });
    setReport({ position: newPosition, direction: newDirection });
  };

  const move = (position: Position, direction: SelectedDirection): Position => {
    const { x, y } = position;
    switch (direction) {
      case "NORTH":
        return { ...position, y: Math.min(y + 1, BOARD_SIZE_Y - 1) };
      case "SOUTH":
        return { ...position, y: Math.max(y - 1, 0) };
      case "EAST":
        return { ...position, x: Math.min(x + 1, BOARD_SIZE_X - 1) };
      case "WEST":
        return { ...position, x: Math.max(x - 1, 0) };
      default:
        return position;
    }
  };

  const rotate = (
    currentDirection: SelectedDirection,
    instruction: string
  ): SelectedDirection => {
    const directions: SelectedDirection[] = ["NORTH", "EAST", "SOUTH", "WEST"];

    const currentIndex = currentDirection
      ? directions.indexOf(currentDirection)
      : 0;
    const nextIndex =
      instruction === "LEFT" ? (currentIndex + 3) % 4 : (currentIndex + 1) % 4;
    return directions[nextIndex];
  };

  const handleReportClick = () => {
    // Call processInstructions only when the "Report" button is clicked
    processInstructions();
  };

  return (
    <div>
      <p>Robot Status:</p>
      <p>
        X: {report?.position.x}, Y: {report?.position.y}, Facing:{" "}
        {report?.direction}
      </p>
      <button
        disabled={Boolean(instructions.length === 0)}
        onClick={handleReportClick}
      >
        Report
      </button>
    </div>
  );
};
