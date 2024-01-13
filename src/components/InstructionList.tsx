type InstructionsListProps = {
  instructions: string[];
  onRemove: (index: number) => void;
};

import deleteIcon from "../assets/delete.svg";

export const InstructionsList: React.FC<InstructionsListProps> = ({
  instructions,
  onRemove,
}) => {
  return (
    <div>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>
            {instruction}
            {instruction.startsWith("PLACE") ? null : (
              <span className="deleteButton" onClick={() => onRemove(index)}>
                <img className="deleteIcon" src={deleteIcon} alt="React logo" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
