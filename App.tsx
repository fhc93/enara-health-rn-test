import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ButtonGrid from "./src/components/buttonGrid/ButtonGrid";
import letters from "./test-board-2.json";
import dictionary from "./dictionary.json";

export default function App() {
  return (
    <View style={styles.container}>
      <ButtonGrid letters={letters.board} validWords={dictionary.words}></ButtonGrid>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
