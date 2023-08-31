import { useNavigation, useLocalSearchParams } from "expo-router"
import { Button, Text, View } from "react-native"

export default function Address() {
  const { id, title } = useLocalSearchParams()
  const { goBack } = useNavigation()

  return (
    <View>
      <Button title="Retour liste" onPress={goBack}/>
      <Text>{id}</Text>
      <Text>{title}</Text>
    </View>
  )
}