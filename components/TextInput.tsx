import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Pressable, TextInput as RNTextInput, StyleSheet, View } from 'react-native';

import Text from './Text';

type TextInputProps = {
  value: string;
  label: string;
  handleBlur: any;
  handleChange: any;
  clearField: any;
  isKeyBoardNumeric?: boolean;
  multiline?: boolean;
  error?: string;
};

export default function TextInput({
  value,
  label,
  handleBlur,
  handleChange,
  clearField,
  isKeyBoardNumeric = false,
  multiline = false,
  error = '',
}: TextInputProps) {
  const handleClear = () => clearField();

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.textInputLabelContainer}>
        <Text text={label} fontSize={16} style={styles.textInputLabel} />
        <Text text={error} fontSize={12} style={styles.error} />
      </View>
      <View style={styles.textInputField}>
        <RNTextInput
          value={value}
          onChangeText={handleChange}
          onBlur={handleBlur}
          style={styles.textInput}
          keyboardType={isKeyBoardNumeric ? 'numeric' : 'default'}
          multiline={multiline}
          cursorColor="#fafafa"
        />
        {!!value && (
          <Pressable onPress={handleClear} style={styles.textInputButton}>
            <Entypo name="cross" size={32} color="#fafafa" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: '#DC143C',
  },
  textInput: {
    backgroundColor: '#1e1e59',
    borderColor: '#f2f2f2',
    borderRadius: 20,
    borderWidth: 1,
    color: '#fafafa',
    flex: 1,
    fontSize: 20,
    marginTop: 5,
    padding: 10,
    paddingHorizontal: 20,
  },
  textInputButton: {
    paddingHorizontal: 5,
  },
  textInputContainer: {
    marginVertical: 6,
  },
  textInputField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputLabel: {
    marginLeft: 8,
  },
  textInputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
