import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

type TextProps = {
  text: string;
  fontSize?: number;
  style?: TextStyle;
};

export default function Text({ text, fontSize, style }: TextProps) {
  return <RNText style={[style, styles(fontSize).text]}>{text}</RNText>;
}

const styles = (fontSize = 20) =>
  StyleSheet.create({
    text: {
      fontSize,
      color: '#fafafa',
      fontWeight: 'bold',
    },
  });
