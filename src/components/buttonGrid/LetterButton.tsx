import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

type LetterButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  pressed: boolean;
  title: string;
};

const LetterButton = ({ children, onClick, pressed, title }: LetterButtonProps) => {
  const gradient = pressed ? ["#b1ea4f", "#459623"] : ["#fad35d", "#f77321"];
  const buttonStyle = pressed ? [styles.buttonWrap, styles.buttonSelected] : [styles.buttonWrap];

  const formattedTtitle = title ? title.toUpperCase() : "";

  return (
    <Pressable
      onPress={() => onClick()}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, buttonStyle]}
    >
      <LinearGradient colors={gradient} style={styles.button}>
        <Text style={styles.text}>{formattedTtitle}</Text>
        {children}
      </LinearGradient>
    </Pressable>
  );
};

export default LetterButton;

const styles = StyleSheet.create({
  buttonWrap: {
    width: 75,
    height: 75,
    margin: 10,
    overflow: "hidden",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#df3d4e",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    height: "100%",
    width: "100%",
  },
  buttonSelected: {
    borderWidth: 0,
  },
  text: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#0d111739",
    textShadowOffset: { width: -2, height: -2 },
    textShadowRadius: 5,
  },
});
