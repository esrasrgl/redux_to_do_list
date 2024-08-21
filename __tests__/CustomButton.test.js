import CustomButton from "../components/CustomButton";
import { fireEvent, render } from "@testing-library/react-native";

describe("Custom Button", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<CustomButton />);
    expect(getByTestId("pressable")).toBeTruthy();
  });

  it("should change style when pressed", () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <CustomButton />
    );
    const button = getByTestId("pressable");
    fireEvent(button, "onResponderGrant", {
      persist: mockPress,
      nativeEvent: {
        timestamp: Date.now(),
      },
    });
    expect(button.props.style[0]).toEqual(
      expect.objectContaining({ opacity: 0.25 })
    );
  });
});
