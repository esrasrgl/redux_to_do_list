import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "../reducers/ToDoSlice";

export const Store = configureStore({
  reducer: {
    toDo: ToDoSlice.reducer,
  },
});
export default Store;
