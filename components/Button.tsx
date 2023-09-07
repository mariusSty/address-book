import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = {
  title: string;
  color?: string;
  onPress?: () => any;
};

export default function Button({ onPress, color, title }: ButtonProps) {
  return (
    <Pressable style={styles(color).button} onPress={onPress}>
      <Text style={styles().text}>{title}</Text>
    </Pressable>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: color ?? '#ff1377',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#fafafa',
    },
  });
