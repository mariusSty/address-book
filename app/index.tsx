import Divider from "@components/Divider";
import Item from "@components/Item";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
  Link,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import { AddressProps } from "./add";
import { Actions, toastMessage } from "types";

SplashScreen.preventAutoHideAsync();

const db = SQLite.openDatabase("address-book");

export default function App() {
  const [addressList, setAddressList] = useState<AddressProps[] | null>(null);
  const { actionPerformed } = useLocalSearchParams<{
    actionPerformed: Actions;
  }>();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      if (!!actionPerformed) {
        Toast.show(
          toastMessage.get(actionPerformed) || "Action bien effectuée ",
          {
            duration: Toast.durations.LONG,
          }
        );
        router.setParams({ actionPerformed: undefined });
      }

      if (!addressList || !!actionPerformed) {
        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, streetNumber INT, address TEXT, postCode TEXT, city TEXT, codes TEXT, comments TEXT)"
          );
        });

        db.transaction((tx) =>
          tx.executeSql(
            "SELECT * from addresses",
            undefined,
            (_, { rows: { _array } }) => setAddressList(_array)
          )
        );
      }
    }, [router])
  );

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
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
