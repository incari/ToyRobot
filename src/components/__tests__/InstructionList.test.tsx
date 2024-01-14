import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { InstructionsList } from "../InstructionList";

describe("InstructionsList", () => {
  it("renders a list of instructions", () => {
    const mockInstructions = ["PLACE 0,0,NORTH", "MOVE", "LEFT", "RIGHT"];
    const { getAllByRole, getByText } = render(
      <InstructionsList instructions={mockInstructions} onRemove={() => {}} />
    );

    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(mockInstructions.length);
    expect(getByText("PLACE 0,0,NORTH")).toBeInTheDocument();
    expect(getByText("MOVE")).toBeInTheDocument();
    expect(getByText("LEFT")).toBeInTheDocument();
    expect(getByText("RIGHT")).toBeInTheDocument();
  });

  it("calls onRemove when delete button is clicked", () => {
    const mockInstructions = ["MOVE", "LEFT", "RIGHT"];
    const mockOnRemove = jest.fn();
    const { getAllByRole } = render(
      <InstructionsList
        instructions={mockInstructions}
        onRemove={mockOnRemove}
      />
    );

    const firstDeleteButton = getAllByRole("img")[0];
    userEvent.click(firstDeleteButton);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });
});
