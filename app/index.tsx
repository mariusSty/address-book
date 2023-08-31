import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Link } from 'expo-router';

type ItemProps = { id: string, title: string }

SplashScreen.preventAutoHideAsync();

function Item({ id, title}: ItemProps) {
  return (
    <View>
      <Link
        href={{
          pathname: "/address/[id]",
          params: { id, title }
        }}>
          {title}
        </Link>
    </View>)
}

export default function App() {
  const [addressList, setAddressList] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ])
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter-Black.otf'),
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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <View>
        <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>Hello</Text>
        <Link href="/add">Ajouter un contact</Link>
        <FlatList
        data={addressList}
        renderItem={({item}) => <Item id={item.id} title={item.title} />}
        keyExtractor={item => item.id}
      />
      </View>
    </SafeAreaProvider>
  );
}

