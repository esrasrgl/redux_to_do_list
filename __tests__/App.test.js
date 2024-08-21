import ToDoScreen from "../screen/ToDoScreen";

describe("testing App page", () => {
  it("should render correctly", () => {
    renderWithRedux(<ToDoScreen />);
  });
});
