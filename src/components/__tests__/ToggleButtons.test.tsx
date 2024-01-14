import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ToggleButtons } from "../ToggleButtons";

describe("ToggleButtons", () => {
  it("highlights the selected button", () => {
    render(<ToggleButtons selected="NORTH" onChange={() => {}} />);

    const northButton = screen.getByRole("button", { name: "NORTH" });
    expect(northButton).toHaveClass("selected");

    // Optionally, verify that other buttons are not selected
    expect(screen.getByRole("button", { name: "SOUTH" })).not.toHaveClass(
      "selected"
    );
    expect(screen.getByRole("button", { name: "EAST" })).not.toHaveClass(
      "selected"
    );
    expect(screen.getByRole("button", { name: "WEST" })).not.toHaveClass(
      "selected"
    );
  });

  it("calls onChange with the correct direction when a button is clicked", () => {
    const mockOnChange = jest.fn();
    render(<ToggleButtons selected={null} onChange={mockOnChange} />);

    const eastButton = screen.getByRole("button", { name: "EAST" });
    userEvent.click(eastButton);

    expect(mockOnChange).toHaveBeenCalledWith("EAST");
  });
});
