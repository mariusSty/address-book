import React from "react";
import { Text, TextInput as RNTextInput, StyleSheet } from "react-native";

type TextInputProps = {
  value: string;
  label: string;
  handleBlur: any;
  handleChange: any;
  isKeyBoardNumeric?: boolean;
};

export default function TextInput({
  value,
  label,
  handleBlur,
  handleChange,
  isKeyBoardNumeric = false,
}: TextInputProps) {
  return (
    <>
      <Text>{label}</Text>
      <RNTextInput
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        style={styles.textInput}
        keyboardType={isKeyBoardNumeric ? "numeric" : "default"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    borderRadius: 4,
  },
});
