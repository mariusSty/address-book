import { StyleSheet, View } from "react-native";

export default function Divider({ height = 1 }) {
  return <View style={styles(height).divider} />
}

const styles = (height: number) => StyleSheet.create({
  divider: {height, flex: 1, backgroundColor: 'grey'}
})