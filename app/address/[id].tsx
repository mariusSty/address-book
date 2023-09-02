import Button from "@components/Button";
import Divider from "@components/Divider";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetAddressDetails } from "@hooks/useGetAddressDetails";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AddressDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { name, streetNumber, address, postCode, city, codes, comments } =
    useGetAddressDetails(id ?? "fakeId");

  return (
    <>
      <Stack.Screen
        options={{
          title: name || "Carnet d'adresse",
          headerRight: () => (
            <Link href="/add">
              <FontAwesome5 name="pen" size={18} color="white" />
            </Link>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.category}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Adresse</Text>
          <Divider marginBottom={10} />
          <Text style={styles.content}>
            {streetNumber} {address}
          </Text>
          <Text style={styles.content}>
            {postCode} {city}
          </Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Codes</Text>
          <Divider marginBottom={10} />
          {codes.map((code: { name: string; value: string }) => {
            return (
              <Text style={styles.content} key={code.name + code.value}>
                {code.name} : {code.value}
              </Text>
            );
          })}
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Commentaire</Text>
          <Divider marginBottom={10} />
          <Text style={styles.content}>{comments}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Se rendre à cette adresse" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 80,
    paddingVertical: 10,
  },
  category: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
});
