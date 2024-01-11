type InstructionsListProps = {
  instructions: string[];
};

export const InstructionsList: React.FC<InstructionsListProps> = ({
  instructions,
}) => {
  return (
    <div>
      <h3>Instructions</h3>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};
