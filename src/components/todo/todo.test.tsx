import { render, screen } from "@testing-library/react";
import Todo from "./todo";
import userEvent from '@testing-library/user-event';

describe("todo components", () => {
  it("should add element to list on user event", () => {
    render(<Todo />);
    expect(screen.queryByText('0 items left')).toBeTruthy();
    const todoInput = screen.getByTestId("todoInput");
    todoInput.focus();
    userEvent.keyboard('hello{enter}');
    expect(screen.queryByText('1 items left')).toBeTruthy();
  });
});
