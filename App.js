import { StyleSheet } from "react-native";
import ToDoScreen from "./screen/ToDoScreen";
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from "react-redux";
import { Store } from "./store/Store";

export default function App() {
  return (
    <Provider store={Store}>
          <LinearGradient colors={["#c051fd", "#c686e9"]} style={styles.container}>
      <ToDoScreen />
    </LinearGradient>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
