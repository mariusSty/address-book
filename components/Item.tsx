import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

type ItemProps = { item: { id: string; name: string }; pathname: string };

export default function Item({ item, pathname }: ItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Link
        style={styles.itemLink}
        href={{
          pathname,
          params: { id: item.id },
        }}
      >
        {item.name}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: { flex: 1, paddingVertical: 10 },
  itemLink: { textAlign: "center", fontSize: 20 },
});
