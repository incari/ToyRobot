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
      <div className="info-container">
        <div className="info-column">
          <h3>Board Size</h3>
          <p>
            X: {BOARD_SIZE_X} Y: {BOARD_SIZE_Y}
          </p>
        </div>
        <div className="info-column">
          <h3>Initial Position</h3>
          <p>
            <CoordinatesInput
              onChange={handleCoordinatesChange}
              maxX={BOARD_SIZE_X}
              maxY={BOARD_SIZE_Y}
              xValue={robotPosition.x}
              yValue={robotPosition.y}
            />
          </p>
        </div>
        <div className="info-column">
          <h3>Facing</h3>
          <p>{selectedDirection}</p>
        </div>
      </div>

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
      <div className="container">
        <div className="column">
          <h3>Instructions</h3>
          <div className="container">
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
          </div>

          <InstructionsList
            instructions={instructions}
            onRemove={handleRemove}
          />
        </div>
        <div className="column">
          <RobotController
            instructions={instructions}
            BOARD_SIZE_X={BOARD_SIZE_X}
            BOARD_SIZE_Y={BOARD_SIZE_Y}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
