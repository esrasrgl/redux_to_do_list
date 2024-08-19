import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { delete_item, edit_item, is_done } from "../reducers/ToDoSlice";

const RenderItem = ({ item }) => {
  const [editItemId, SetEditItemId] = useState(null);
  const [newText, SetNewText] = useState(item.text);
  const dispatch = useDispatch();

  const handleNewText = () => {
    if (newText.trim() === "") {
      Alert.alert("Warning", "Invalid input");
      SetNewText(item.text);
    } else {
      dispatch(edit_item({ id: item.id, newText: newText }));
      SetEditItemId(null);
    }
  };

  return (
    <View style={styles.goalItem}>
      {editItemId === item.id ? (
        <>
          <TextInput
            testID="editTextID"
            style={styles.goalText}
            onChangeText={SetNewText}
            value={newText}
          />
          <CustomButton iconName="check" onpress={handleNewText} />
        </>
      ) : (
        <>
          <CustomButton
            iconName={item.isDone ? "check-square" : "square"}
            onpress={() => dispatch(is_done(item.id))}
          />
          <Text
            testID="TextID"
            style={[
              styles.goalText,
              { textDecorationLine: item.isDone ? "line-through" : "none" },
            ]}
          >
            {item.text}
          </Text>
          <CustomButton
            iconName="pencil-alt"
            onpress={() => SetEditItemId(item.id)}
          />
          <CustomButton
            iconName="trash"
            onpress={() => dispatch(delete_item(item.id))}
          />
        </>
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 8,
  },
  goalText: {
    flex: 1,
    color: "black",
    fontSize: 18,
  },
});
