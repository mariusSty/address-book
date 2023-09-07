import Button from '@components/Button';
import Divider from '@components/Divider';
import Text from '@components/Text';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerLeftIcon}>
              <FontAwesome5 name="chevron-left" size={26} color="white" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.category}>
          <View style={styles.nameCategory}>
            <Ionicons name="person" size={30} color="#fafafa" />
            <Text style={styles.title} text={name} fontSize={28} />
          </View>
        </View>
        <View style={styles.category}>
          <Divider marginBottom={20} />
          <View style={styles.subtitle}>
            <FontAwesome5 name="map" size={24} color="#fafafa" />
            <Text text="Adresse" fontSize={16} />
          </View>
          <Text style={styles.content} text={streetNumber + ' ' + address} />
          <Text style={styles.content} text={postCode + ' ' + city} />
        </View>
        <View style={styles.category}>
          <Divider marginBottom={20} />
          <View style={styles.subtitle}>
            <FontAwesome5 name="lock" size={20} color="#fafafa" />
            <Text text="Codes" fontSize={16} />
          </View>
          <Text style={styles.content} text={codes} />
        </View>
        <View style={styles.category}>
          <Divider marginBottom={20} />
          <View style={styles.subtitle}>
            <FontAwesome5 name="pen" size={20} color="#fafafa" />
            <Text text="Commentaire" fontSize={16} />
          </View>
          <Text style={styles.content} text={comments} />
        </View>

        <Divider marginBottom={20} />
        <Button onPress={handleDelete} title="Supprimer" color="#DC143C" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Se rendre à cette adresse" />
      </View>
      <Modal animationType="fade" visible={isModalVisible} transparent>
        <Pressable onPress={handleCancel} style={styles.modalContainer}>
          <Pressable onPress={null} style={styles.modalContent}>
            <Text
              style={styles.confirmText}
              text="Voulez-vous vraiment supprimer définitivement cette adresse ?
            "
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.confirmViewButton}>
                <Pressable onPress={handleConfirmDelete} style={styles.confirmButton}>
                  <Text style={styles.textButton} text="Confirmer" fontSize={16} />
                </Pressable>
              </View>
              <View style={styles.cancelViewButton}>
                <Pressable onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.textButton} text="Annuler" fontSize={16} />
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
    backgroundColor: '#DC143C',
  },
  cancelViewButton: {
    flex: 1,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#00002b',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderBottomLeftRadius: 20,
    elevation: 3,
    backgroundColor: '#00693E',
  },
  confirmViewButton: {
    flex: 1,
    borderBottomLeftRadius: 20,
  },
  nameCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    backgroundColor: '#1e1e59',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeftIcon: {
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#1e1e59',
    elevation: 10,
    shadowColor: '#fafafa',
    borderRadius: 20,
    paddingTop: 20,
  },
  category: { marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 5,
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
