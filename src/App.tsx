import React, { useState } from "react";
import "./App.css";
import CoordinatesInput from "./components/CoordinatesInput";
import { ToggleButtons } from "./components/ToggleButtons";
import { InstructionsList } from "./components/InstructionList";
// import { RobotController } from "./components/RobotController";

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
    useState<null | SelectedDirection>(null);

  const [instructions, setInstructions] = useState<string[]>([]);

  const addInstruction = (instruction: string) => {
    setInstructions((prevInstructions) => [...prevInstructions, instruction]);
  };

  const handleCoordinatesChange = (axis: "x" | "y", value: number) => {
    if (axis === "x") {
      // Restrict x coordinate to be below BOARD_SIZE_X
      value = Math.min(BOARD_SIZE_X, value);
    }

    setRobotPosition((prevPosition) => ({
      ...prevPosition,
      [axis]: value,
    }));
  };

  const handlePlaceRobot = () => {
    // Clear previous instruction to start again
    setInstructions([]);

    addInstruction(
      `PLACE ${robotPosition.x},${robotPosition.y},${selectedDirection}`
    );
  };

  const handleReport = () => {};

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
      />
      <ToggleButtons
        selected={selectedDirection}
        onChange={setSelectedDirection}
      />

      <button onClick={handlePlaceRobot}>Place</button>

      <div>Instructions</div>

      <button onClick={() => addInstruction("MOVE")}>Move</button>
      <button onClick={() => addInstruction("LEFT")}>Left</button>
      <button onClick={() => addInstruction("RIGHT")}>Right</button>
      <button onClick={handleReport}>Report</button>

      <InstructionsList instructions={instructions} />
      {/* add logic 
      <RobotController
        instructions={instructions}
        BOARD_SIZE_X={BOARD_SIZE_X}
        BOARD_SIZE_Y={BOARD_SIZE_Y}
  /> */}
    </div>
  );
};

export default App;
