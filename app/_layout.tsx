import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e1e59',
        },
        headerTitleAlign: 'left',
        headerTintColor: '#fafafa',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26,
        },
        title: 'Mes adresses',
      }}
    />
  );
}
