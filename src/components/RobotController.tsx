import { useRobotController } from "../hooks/useRobotController";

type RobotControllerProps = {
  instructions: string[];
  BOARD_SIZE_X: number;
  BOARD_SIZE_Y: number;
};

export const RobotController: React.FC<RobotControllerProps> = ({
  instructions,
  BOARD_SIZE_X,
  BOARD_SIZE_Y,
}) => {
  const { report, processInstructions } = useRobotController(
    instructions,
    BOARD_SIZE_X,
    BOARD_SIZE_Y
  );

  const handleReportClick = () => {
    // Call processInstructions only when the "Report" button is clicked
    processInstructions();
  };

  return (
    <div>
      <h3>Robot Status</h3>
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
