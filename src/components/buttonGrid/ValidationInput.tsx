import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

type ValidationInputProps = {
  isValidWord: boolean;
  selectedLetters: string;
};

export default function ValidationInput({
  isValidWord,
  selectedLetters,
}: ValidationInputProps) {
  const wordValidationText = () => {
    if (isValidWord) {
      return "valid";
    } else if (selectedLetters.length > 2) {
      return "invalid";
    }
    return "";
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        value={selectedLetters}
        editable={false}
        underlineColorAndroid="transparent"
      />
      <Text
        style={[
          styles.validationText,
          isValidWord ? styles.validText : styles.invalidText,
        ]}
      >
        {wordValidationText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
    borderWidth: 2,
    marginLeft: 10,
    borderColor: "#979797",
    paddingRight: 10,
    height: 70,
  },
  input: {
    padding: 10,
    paddingLeft: 25,
    fontSize: 30,
    fontWeight: "bold",
    color: "#7ed321",
    textTransform: "uppercase",
    letterSpacing: 7,
    width: "75%",
  },
  validationText: {
    fontSize: 20,
    minWidth: "25%",
  },
  validText: {
    color: "#cddabc",
  },
  invalidText: {
    color: "#f5cacf",
  },
});
