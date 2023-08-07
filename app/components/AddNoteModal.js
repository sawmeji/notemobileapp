import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AddButton from "../components/AddButton";

const AddNoteModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss;
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "body") setBody(text);
  };

  const handleOnSubmit = () => {
    if (!title.trim() && !body.trim()) return onClose();
    if (isEdit) {
      onSubmit(title, body, Date.now());
    } else {
      onSubmit(title, body);
      setTitle("");
      setBody("");
    }
    onClose();
  };

  const handleOnClose = () => {
    if (!isEdit) {
      setTitle("");
      setBody("");
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              value={title}
              onChangeText={(text) => {
                handleOnChangeText(text, "title");
              }}
              placeholder="Title"
              style={[styles.input, styles.title]}
            />
            <TextInput
              value={body}
              multiline
              placeholder="Note"
              style={[styles.input, styles.body]}
              onChangeText={(text) => {
                handleOnChangeText(text, "body");
              }}
            />
          </View>
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View
              style={[styles.modalBG, StyleSheet.absoluteFillObject]}
            ></View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.btnContainer}>
          <Text style={styles.button} onPress={handleOnSubmit}>
            Save
          </Text>
          <Text style={styles.button} onPress={handleOnClose}>
            Cancel
          </Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    borderBottomWidth: 2,
    borderBlockColor: "#eee",
    fontSize: 20,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  body: {},
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    bottom: 10,
    marginHorizontal: 50,
  },
  button: {
    backgroundColor: "#85C1E9",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    fontSize: 20,
  },
});

export default AddNoteModal;
