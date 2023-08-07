import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NotesPage from "./app/components/NotesPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NoteDetails from "./app/components/NoteDetails";
import NoteProvider from "./app/contexts/NoteProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: true }}
        >
          <Stack.Screen component={NotesPage} name="NotesPage" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
