import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5634d9',
      },
      headerTitleAlign: "center",
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: "Carnet d'adresse",
    }}
  />)
}