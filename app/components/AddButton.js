import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AddButton = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#5DADE2",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default AddButton;
