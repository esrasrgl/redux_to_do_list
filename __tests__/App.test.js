import { render } from "@testing-library/react-native";
import ToDoScreen from "../screen/ToDoScreen";
import { Provider } from "react-redux";
import Store from "../store/Store";

describe('testing App page', () => {
    it('should render correctly', () => {
        render(
            <Provider store={Store}>
                <ToDoScreen/>
            </Provider>
        )
    });
});