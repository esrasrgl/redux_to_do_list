import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  Alert,
} from "react-native";
import RenderItem from "../components/RenderItem";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { add_item } from "../reducers/ToDoSlice";

export default function ToDoScreen() {
  const [inputValue, SetInputValue] = useState("");
  const dispatch = useDispatch();
  const toDoItems = useSelector((state) => state.toDo.toDoItems);

  const handleInputValue = () => {
    if (inputValue.trim() === "") {
      Alert.alert("Warning", "Invalid input");
    } else {
      dispatch(add_item(inputValue));
      SetInputValue("");
    }
  };
  return (
    <>
      <Text style={styles.title}>TO DO LIST</Text>
      <View style={styles.goalContainer} testID="toDoScreen">
        <TextInput
          style={styles.goalInput}
          placeholder=" Add new todo item"
          onChangeText={SetInputValue}
          value={inputValue}
          testID="addText"
        />
        <CustomButton iconName={"plus"} onpress={handleInputValue} />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          testID="flatId"
          data={toDoItems}
          renderItem={(itemData) => <RenderItem item={itemData.item} />}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          removeClippedSubviews={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    margin: 24,
    fontSize: 30,
    fontWeight: "bold",
  },
  goalInput: {
    marginRight: 24,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 8,
  },
  goalContainer: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  goalsContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    flex: 1,
    margin: 24,
  },
});
