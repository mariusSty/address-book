import { Stack } from "expo-router";
import { Text, TextInput, View } from "react-native";

export default function Add() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Ajouter une adresse',
        }}
      />
      <TextInput style={{ height: 40 }}>Test</TextInput>
    </View>
  );
}