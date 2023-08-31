import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Add() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Ajouter une adresse',
        }}
      />
      <Text>Test</Text>
    </View>
  );
}