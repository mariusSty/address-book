import Button from '@components/Button';
import Divider from '@components/Divider';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'types';

const db = SQLite.openDatabase('address-book');

export default function AddressDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleConfirmDelete = () => {
    if (!id) return;
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM addresses WHERE id = ?;`, [id], () => {
        router.push({
          pathname: '/',
          params: { actionPerformed: Actions.Delete },
        });
      });
    });
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleDelete = () => {
    setIsModalVisible(true);
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
      <Modal animationType="fade" visible={isModalVisible} transparent>
        <Pressable onPress={handleCancel} style={styles.modalContainer}>
          <Pressable onPress={null} style={styles.modalContent}>
            <Text style={styles.confirmText}>
              Voulez-vous vraiment supprimer définitivement cette adresse ?
            </Text>
            <View style={styles.modalButtonContainer}>
              <View style={styles.confirmViewButton}>
                <Pressable onPress={handleConfirmDelete} style={styles.confirmButton}>
                  <Text style={styles.textButton}>Confirmer</Text>
                </Pressable>
              </View>
              <View style={styles.cancelViewButton}>
                <Pressable onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.textButton}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderBottomRightRadius: 20,
    elevation: 3,
    backgroundColor: 'red',
  },
  cancelViewButton: {
    flex: 1,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderBottomLeftRadius: 20,
    elevation: 3,
    backgroundColor: 'green',
  },
  confirmViewButton: {
    flex: 1,
    borderBottomLeftRadius: 20,
  },
  confirmText: {
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 80,
    paddingVertical: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    borderRadius: 20,
    backgroundColor: 'grey',
    paddingTop: 20,
  },
  category: { marginBottom: 60 },
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
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
