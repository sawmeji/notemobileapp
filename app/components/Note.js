import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Note = ({ item, onPress }) => {
  const { title, body } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3}>{body}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    width: width - 10,
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Note;
