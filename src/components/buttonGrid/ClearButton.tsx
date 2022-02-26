import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type ClearButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const ClearButton = ({ disabled, onClick }: ClearButtonProps) => {
  return (
    <View style={styles.clearButtonWrapper}>
      <View>
        <Pressable
          style={styles.clearButton}
          onPress={() => onClick()}
          disabled={disabled}
        >
          <Text style={styles.clearText}>clear word</Text>
          <View style={styles.circle}>
            {/* I didn't want to import an individual icon */}
            {/* or a whole library so I went full on DIY for the cross icon */}
            <View style={[!disabled && styles.cross, styles.cross1]}></View>
            <View style={[!disabled && styles.cross, styles.cross2]}></View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ClearButton;

const styles = StyleSheet.create({
  clearButtonWrapper: {
    display: "flex",
    alignSelf: "stretch",
    paddingHorizontal: 50,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  clearButton: {
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
  },
  clearText: {
    color: "#d8d8d8",
    marginRight: 10,
    fontSize: 20,
  },
  circle: {
    backgroundColor: "#d8d8d8",
    width: 42,
    height: 42,
    borderRadius: 50,
    position: "relative",
  },
  cross: {
    width: 1,
    height: 30,
    backgroundColor: "white",
    position: "absolute",
    top: 6,
    left: "50%",
  },
  cross1: {
    transform: [{ rotate: "45deg" }],
  },
  cross2: {
    transform: [{ rotate: "135deg" }],
  },
});
