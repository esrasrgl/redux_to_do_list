import { configureStore } from "@reduxjs/toolkit";
import ToDoSlice from "../reducers/ToDoSlice";

export const Store = (preloadedState)  =>{
  return configureStore({
    reducer: {
      toDo: ToDoSlice,
    },
    preloadedState,
  });
}
export default Store;
