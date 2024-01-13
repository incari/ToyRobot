import React, { useState } from "react";
import "./App.css";
import CoordinatesInput from "./components/CoordinatesInput";
import { ToggleButtons } from "./components/ToggleButtons";
import { InstructionsList } from "./components/InstructionList";
import { RobotController } from "./components/RobotController";

export type Position = {
  x: number;
  y: number;
};

export type SelectedDirection = "NORTH" | "SOUTH" | "EAST" | "WEST";

const BOARD_SIZE_X = 5;
const BOARD_SIZE_Y = 5;

const App: React.FC = () => {
  const [robotPosition, setRobotPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedDirection, setSelectedDirection] =
    useState<SelectedDirection>("NORTH");
  const [instructions, setInstructions] = useState<string[]>([]);

  const addInstruction = (instruction: string) => {
    setInstructions((prevInstructions) => [...prevInstructions, instruction]);
  };

  const handleCoordinatesChange = (axis: "x" | "y", value: number) => {
    if (axis === "x") {
      // Restrict x coordinate to be below BOARD_SIZE_X
      value = Math.min(BOARD_SIZE_X - 1, value);
    }
    if (axis === "y") {
      // Restrict x coordinate to be below BOARD_SIZE_X
      value = Math.min(BOARD_SIZE_Y - 1, value);
    }

    setRobotPosition((prevPosition) => ({
      ...prevPosition,
      [axis]: value,
    }));
  };

  const handlePlaceRobot = () => {
    // Clear previous instruction to start again
    setInstructions([]);
    setRobotPosition({ x: 0, y: 0 });
    addInstruction(
      `PLACE ${robotPosition.x},${robotPosition.y},${selectedDirection}`
    );
  };

  const handleRemove = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  return (
    <div className="App">
      <div>
        Board Size: X= {BOARD_SIZE_X}
        Y= {BOARD_SIZE_Y}
      </div>
      <p>
        Robot Initial Position: X: {robotPosition.x}, Y: {robotPosition.y}
      </p>
      <p> Facing: {selectedDirection}</p>
      <CoordinatesInput
        onChange={handleCoordinatesChange}
        maxX={BOARD_SIZE_X}
        maxY={BOARD_SIZE_Y}
        xValue={robotPosition.x}
        yValue={robotPosition.y}
      />
      <ToggleButtons
        selected={selectedDirection}
        onChange={setSelectedDirection}
      />

      <button onClick={handlePlaceRobot}>Place</button>
      <button
        onClick={() => {
          setInstructions([]);
          setRobotPosition({ x: 0, y: 0 });
        }}
        disabled={Boolean(instructions.length === 0)}
      >
        Clear
      </button>

      <h3>Instructions</h3>

      <button
        disabled={Boolean(instructions.length === 0)}
        onClick={() => addInstruction("MOVE")}
      >
        Move
      </button>
      <button
        disabled={Boolean(instructions.length === 0)}
        onClick={() => addInstruction("LEFT")}
      >
        Left
      </button>
      <button
        disabled={Boolean(instructions.length === 0)}
        onClick={() => addInstruction("RIGHT")}
      >
        Right
      </button>

      <InstructionsList instructions={instructions} onRemove={handleRemove} />

      <RobotController
        instructions={instructions}
        BOARD_SIZE_X={BOARD_SIZE_X}
        BOARD_SIZE_Y={BOARD_SIZE_Y}
      />
    </div>
  );
};

export default App;
