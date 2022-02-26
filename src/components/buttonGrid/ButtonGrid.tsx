import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import LetterButton from "./LetterButton";
import ClearButton from "./ClearButton";
import ValidationInput from "./ValidationInput";

type ButtonGridProps = {
  letters: string[];
  validWords?: string[];
};

type FormattedLetter = {
  pressed: boolean;
  col: number;
  row: number;
  value: string;
};

type LastButtonPressed = {
  col: number;
  row: number;
};

const ButtonGrid = ({ letters, validWords = [] }: ButtonGridProps) => {
  const wordSet = new Set(validWords);
  const [formattedLetters, setFormattedLetters] = useState<FormattedLetter[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastButtonPressed, setLastButtonPressed] = useState<LastButtonPressed>({
    col: 0,
    row: 0,
  });
  const [selectedLetters, setSelectedLetters] = React.useState("");
  const [isValidWord, setIsValidWord] = React.useState(false);

  useEffect(() => {
    const newLetters = letters.map((letter, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      return {
        col,
        row,
        value: letter,
        pressed: false,
      };
    });

    setFormattedLetters(newLetters);
  }, [letters]);

  useEffect(() => {
    if (!validWords?.length || selectedLetters.length <= 2) return;
    if (wordSet.has(selectedLetters.toLowerCase())) {
      setIsValidWord(true);
      return;
    }
    setIsValidWord(false);
  }, [selectedLetters]);

  const handlePress = (index: number) => {
    let newArr = [...formattedLetters];

    if (!gameStarted) {
      newArr[index] = { ...newArr[index], pressed: true };
      setFormattedLetters(newArr);
      setLastButtonPressed({ col: newArr[index].col, row: newArr[index].row });
      setGameStarted(true);
      setSelectedLetters((prevLetters) => prevLetters.concat(newArr[index].value));
      return;
    }

    if (
      Math.abs(lastButtonPressed?.col - newArr[index].col) <= 1 &&
      Math.abs(lastButtonPressed?.row - newArr[index].row) <= 1 &&
      !(
        lastButtonPressed?.row === newArr[index].row &&
        lastButtonPressed?.col === newArr[index].col
      )
    ) {
      newArr[index] = { ...newArr[index], pressed: true };
      setFormattedLetters(newArr);
      setLastButtonPressed({ col: newArr[index].col, row: newArr[index].row });
      setSelectedLetters((prevLetters) => prevLetters.concat(newArr[index].value));
    }
  };

  const handleReset = () => {
    setLastButtonPressed({
      col: 0,
      row: 0,
    });
    setSelectedLetters("");
    setGameStarted(false);
    setFormattedLetters((prevFormattedLetters) =>
      prevFormattedLetters.map((letter) => ({ ...letter, pressed: false }))
    );
    setIsValidWord(false);
  };

  return (
    <View style={styles.gameContainer}>
      <ClearButton disabled={!gameStarted} onClick={() => handleReset()}></ClearButton>
      <View style={styles.grid}>
        {formattedLetters.length
          ? formattedLetters.map((letter, index) => {
              return (
                <View
                  style={styles.col}
                  key={`${letter.value}-${letter.col}-${letter.row}`}
                >
                  <LetterButton
                    pressed={letter.pressed}
                    title={letter.value}
                    onClick={() => handlePress(index)}
                  ></LetterButton>
                </View>
              );
            })
          : null}
      </View>
      <ValidationInput isValidWord={isValidWord} selectedLetters={selectedLetters} />
    </View>
  );
};

export default ButtonGrid;

const styles = StyleSheet.create({
  gameContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  grid: {
    width: "94%",
    marginVertical: 0,
    marginHorizontal: "auto",
    padding: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  col: {
    width: "25%",
  },
});
