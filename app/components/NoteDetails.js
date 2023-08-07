import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddButton from "./AddButton";
import { useNotes } from "../contexts/NoteProvider";
import AddNoteModal from "./AddNoteModal";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetails = (props) => {
  const [note, setNote] = useState(props.route.params.note);

  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your note permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const handleUpdate = async (title, body, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.body = body;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.body}>{note.body}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <AddButton
          antIconName="delete"
          style={{ backgroundColor: "#EC7063", marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <AddButton antIconName="edit" onPress={openEditModal} />
      </View>
      <AddNoteModal
        isEdit={isEdit}
        note={note}
        visible={showModal}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
      />
    </>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  body: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NoteDetails;
