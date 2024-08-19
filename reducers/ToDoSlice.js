import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDoItems: [],
};

export const ToDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    add_item: (state, action) => {
      const text = action.payload;
      const id = Math.random().toString();
      const isDone = false;
      state.toDoItems.push({ text, id, isDone });
    },
    delete_item(state, action) {
      id = action.payload;
      state.toDoItems = state.toDoItems.filter((toDo) => toDo.id !== id);
    },
    edit_item(state, action) {
      const { id, newText } = action.payload;
      const item = state.toDoItems.find((item) => item.id === id);
      if (item) {
        item.text = newText;
      }
    },
    is_done(state, action) {
      console.log("log, is_done=>", action.payload);
      const id = action.payload;
      const item = state.toDoItems.find((item) => item.id == id);
      if (item) {
        item.isDone = !item.isDone;
      }
    },
  },
});

export default ToDoSlice;
export const { add_item, delete_item, edit_item, is_done } = ToDoSlice.actions;
