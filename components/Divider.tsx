import { StyleSheet, View } from 'react-native';

export default function Divider({ height = 1, marginBottom = 0 }) {
  return <View style={styles(height, marginBottom).divider} />;
}

const styles = (height: number, marginBottom: number) =>
  StyleSheet.create({
    divider: {
      height,
      backgroundColor: '#fafafa',
      marginBottom,
      shadowColor: '#fafafa',
      elevation: 10,
    },
  });
