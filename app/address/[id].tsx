import Button from '@components/Button';
import Divider from '@components/Divider';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const db = SQLite.openDatabase('address-book');

export default function AddressDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [addressDetails, setAddressDetails] = useState({
    name: '',
    streetNumber: '',
    address: '',
    postCode: '',
    city: '',
    codes: '',
    comments: '',
  });

  useEffect(() => {
    if (id) {
      db.transaction((tx) =>
        tx.executeSql('SELECT * from addresses WHERE id = ?', [id], (_, { rows: { _array } }) =>
          setAddressDetails(_array[0])
        )
      );
    }
  }, []);

  const { name, streetNumber, address, postCode, city, codes, comments } = addressDetails;

  const handleDelete = () => {
    if (!id) return;
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM addresses WHERE id = ?;`, [id]);
      },
      undefined,
      () => router.push('/')
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: name || "Carnet d'adresse",
          headerRight: () => (
            <Link href={{ pathname: '/add', params: { id } }}>
              <FontAwesome5 name="pen" size={18} color="white" />
            </Link>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.category}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Adresse</Text>
          <Divider marginBottom={10} />
          <Text style={styles.content}>
            {streetNumber} {address}
          </Text>
          <Text style={styles.content}>
            {postCode} {city}
          </Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Codes</Text>
          <Divider marginBottom={10} />
          <Text style={styles.content}>{codes}</Text>
        </View>
        <View style={styles.category}>
          <Text style={styles.subtitle}>Commentaire</Text>
          <Divider marginBottom={10} />
          <Text style={styles.content}>{comments}</Text>
        </View>

        <Button onPress={handleDelete} title="Supprimer" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Se rendre à cette adresse" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 80,
    paddingVertical: 10,
  },
  category: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
  },
});
