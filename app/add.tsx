import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function Add() {
  return (
    <Link href="/" asChild>
      <Pressable>
        <Text>Retour</Text>
      </Pressable>
    </Link>
  );
}