import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import SearchBar from "./SearchBar";
import AddButton from "../components/AddButton";
import AddNoteModal from "../components/AddNoteModal";
import Note from "./Note";
import { useNotes } from "../contexts/NoteProvider";

const NotesPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };

  const handleOpenModal = () => {
    console.log("Open");
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOnSubmit = async (title, body) => {
    const note = { id: Date.now(), title, body, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Your Notes</Text>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />
          <View
            style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
          >
            <Text style={styles.emptyHeader}>Add New Notes</Text>
          </View>
          <AddButton
            antIconName="plus"
            style={styles.addBtn}
            onPress={handleOpenModal}
          />
        </View>
      </TouchableWithoutFeedback>

      <AddNoteModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default NotesPage;
