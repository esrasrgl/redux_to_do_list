import { fireEvent } from "@testing-library/react-native";
import ToDoScreen from "../screen/ToDoScreen";
import { Alert } from "react-native";

describe("toDoScreen tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = renderWithRedux(<ToDoScreen />, {
      preloadedState: {
        toDo: {
          toDoItems: [],
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    expect(wrapper.getByTestId("toDoScreen")).toBeTruthy();
    expect(wrapper.getByTestId("flatId")).toBeTruthy();
  });

  it("should add item to the list", () => {
    const inputVal = wrapper.getByTestId("addText");
    const button = wrapper.getByTestId("pressable");
    const newItem = "new item";

    expect(inputVal).toBeTruthy();
    expect(button).toBeTruthy();

    fireEvent.changeText(inputVal, newItem);
    expect(inputVal.props.value).toBe(newItem);

    fireEvent.press(button);
    const state = wrapper.store.getState();
    expect(state.toDo.toDoItems).toEqual([
      { text: "new item", id: expect.anything(), isDone: false },
    ]);
  });

  it("should show alert when input is empty", () => {
    const inputVal = wrapper.getByTestId("addText");
    const button = wrapper.getByTestId("pressable");

    const alert = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    fireEvent.changeText(inputVal, "");
    fireEvent.press(button);
    expect(alert).toHaveBeenCalledWith("Warning", "Invalid input");

    alert.mockRestore();
  });
});
