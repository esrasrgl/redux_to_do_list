import { fireEvent } from "@testing-library/react-native";
import RenderItem from "../components/RenderItem";
import { Alert } from "react-native";

describe("renderItem tests", () => {
  let wrapper;
  const mockDataTodos = { text: "text", id: "3", isDone: false };
  beforeEach(() => {
    wrapper = renderWithRedux(<RenderItem item={mockDataTodos} />, {
      preloadedState: {
        toDo: {
          toDoItems: [{ text: "text", id: "3", isDone: false }],
        },
      },
    });
  });

  it("should render correctly", () => {
    expect(wrapper.getByTestId("TextID")).toBeTruthy();
  });

  it("should update text style when checked", () => {
    const button = wrapper.getAllByTestId("pressable");
    fireEvent.press(button[0]);

    const updateItem = wrapper.store.getState().toDo.toDoItems[0];
    wrapper.rerender(<RenderItem item={updateItem} />);
    const text = wrapper.getByTestId("TextID");
    expect(text.props.style[1].textDecorationLine).toBe("line-through");
  });

  it("should edit text when pressed", () => {
    const button = wrapper.getAllByTestId("pressable")[1];
    fireEvent.press(button);
    expect(wrapper.getByTestId("editTextID")).toBeTruthy();
  });

  it("should delete item when pressed", () => {
    const button = wrapper.getAllByTestId("pressable")[2];
    fireEvent.press(button);

    const updateItem = wrapper.store.getState().toDo.toDoItems;
    expect(updateItem).toEqual([]);
  });

  it("should edit item when pressed", () => {
    let newText = "newText";
    const editBtn = wrapper.getAllByTestId("pressable")[1];
    fireEvent.press(editBtn);

    const editText = wrapper.getByTestId("editTextID");
    fireEvent.changeText(editText, newText);
    expect(editText.props.value).toEqual(newText);

    const checkBtn = wrapper.getAllByTestId("pressable")[0];
    fireEvent.press(checkBtn);

    const updateItem = wrapper.store.getState().toDo.toDoItems;
    expect(updateItem[0].text).toBe(newText);
  });

  it("should show alert", () => {
    const alert = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const newText = "";
    const editBtn = wrapper.getAllByTestId("pressable")[1];
    fireEvent.press(editBtn);

    const editText = wrapper.getByTestId("editTextID");
    fireEvent.changeText(editText, "");
    const checkBtn = wrapper.getAllByTestId("pressable")[0];
    fireEvent.press(checkBtn);

    expect(alert).toHaveBeenCalledWith("Warning", "Invalid input");
    alert.mockRestore();

  });
});
