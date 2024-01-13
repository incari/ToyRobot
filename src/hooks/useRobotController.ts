import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

type SelectedDirection = "NORTH" | "SOUTH" | "EAST" | "WEST";

type Report = {
  position: Position;
  direction: SelectedDirection;
};

export const useRobotController = (
  instructions: string[],
  BOARD_SIZE_X: number,
  BOARD_SIZE_Y: number
) => {
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

  return { report, processInstructions };
};
