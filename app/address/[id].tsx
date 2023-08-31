import { Stack, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function Address() {
  const { id, title } = useLocalSearchParams()

  return (
    <View>
      <Stack.Screen
        options={{
          title: title || "Carnet d'adresse",
        }}
      />
      <Text>{id}</Text>
      <Text>{title}</Text>
    </View>
  )
}