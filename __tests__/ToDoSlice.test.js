import reducer, {
  add_item,
  delete_item,
  edit_item,
  is_done,
} from "../reducers/ToDoSlice";

describe("toDoSlice tests", () => {
  const previousState = {
    toDoItems: [{ text: "item1", id: 1, isDone: false }],
  };

  it("should return the initial state", () => {
    const initialS = reducer(undefined, { type: "unknown" }).toDoItems;
    expect(initialS).toEqual([]);
  });

  it("should added to an empty list", () => {
    const previousState = { toDoItems: [] };
    const newState = reducer(previousState, add_item("item1")).toDoItems;
    expect(newState).toEqual([
      { text: "item1", id: expect.anything(), isDone: false },
    ]);
  });

  it("should delete item", () => {
    const newState = reducer(previousState, delete_item(1)).toDoItems;
    expect(newState).toEqual([]);
  });

  it("should edit item", () => {
    const id = 1;
    const newText = "edit";
    const newState = reducer(
      previousState,
      edit_item({ id, newText })
    ).toDoItems;
    expect(newState).toEqual([
      { text: newText, id: expect.anything(), isDone: false },
    ]);
  });

  it("should not edit text if item is not found", () => {
    const id = 2;
    const defaultText = "item1";
    const newState = reducer(
      previousState,
      edit_item({ id, newText: "edit" })
    ).toDoItems;
    expect(newState[0].text).toEqual(defaultText);
  });

  it("should is done ", () => {
    const id = 1;
    const newState = reducer(previousState, is_done(id)).toDoItems;
    expect(newState[0].isDone).toEqual(true);
  });

  it("should not change state if item is not found", () => {
    const id = 2;
    const defaultState = false;
    const newState = reducer(previousState, is_done(id)).toDoItems;
    expect(newState[0].isDone).toEqual(defaultState);
  });
});
