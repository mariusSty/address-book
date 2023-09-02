import Divider from "@components/Divider";
import Item from "@components/Item";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export type Address = {
  id: string;
  name: string;
};

export default function App() {
  const [addressList, setAddressList] = useState<Address[]>([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Third Item",
    },
  ]);
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/add">
              <AntDesign name="plus" size={32} color="white" />
            </Link>
          ),
        }}
      />
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <FlatList
            data={addressList}
            renderItem={({ item }) => (
              <Item item={item} pathname="/address/[id]" />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider />}
            ListFooterComponent={() => <Divider />}
          />
        </View>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
