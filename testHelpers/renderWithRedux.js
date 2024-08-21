import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import Store from "../store/Store";

export function renderWithRedux(
  renderedComponent,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store =Store(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(renderedComponent, { wrapper: Wrapper, ...renderOptions }) };
}