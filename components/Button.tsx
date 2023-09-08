import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  color?: string;
  style?: ViewStyle;
  onPress?: () => any;
};

export default function Button({ onPress, color, title, style }: ButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles(pressed, color).button, style]} onPress={onPress}>
      <Text style={styles().text}>{title}</Text>
    </Pressable>
  );
}

const styles = (pressed = false, color?: string) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: color ?? '#ff1377',
      opacity: pressed ? 0.5 : 1,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#fafafa',
    },
  });
