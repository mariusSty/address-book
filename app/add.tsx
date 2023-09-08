import Button from '@components/Button';
import TextInput from '@components/TextInput';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'types';

const db = SQLite.openDatabase('address-book');

export type AddressProps = {
  id: string;
  name: string;
  streetNumber: string;
  address: string;
  postCode: string;
  city: string;
  codes?: string;
  comments?: string;
};

export default function Add() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [addressDetails, setAddressDetails] = useState<AddressProps | null>(null);

  useEffect(() => {
    if (id) {
      db.transaction((tx) =>
        tx.executeSql('SELECT * from addresses WHERE id = ?', [id], (_, { rows: { _array } }) =>
          setAddressDetails(_array[0])
        )
      );
    }
  }, []);

  const handleSubmit = (values: Partial<AddressProps>) => {
    if (id) {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE addresses SET name = ?, streetNumber = ?, address = ?, postCode = ?, city = ?, codes = ?, comments = ? WHERE id = ?',
          [
            values.name || null,
            values.streetNumber || null,
            values.address || null,
            values.postCode || null,
            values.city || null,
            values.codes || null,
            values.comments || null,
            id,
          ],
          () => {
            router.push({
              pathname: '/',
              params: { actionPerformed: Actions.Update },
            });
          }
        );
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO addresses (name, streetNumber, address, postCode, city, codes, comments) values (?, ?, ?, ?, ?, ?, ?)',
          [
            values.name || null,
            values.streetNumber || null,
            values.address || null,
            values.postCode || null,
            values.city || null,
            values.codes || null,
            values.comments || null,
          ],
          () => {
            router.push({
              pathname: '/',
              params: { actionPerformed: Actions.Add },
            });
          }
        );
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: id ? 'Modifier cette adresse' : 'Ajouter une adresse',
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.headerLeftIcon}>
              <FontAwesome5 name="chevron-left" size={26} color="white" />
            </Pressable>
          ),
        }}
      />
      <Formik
        initialValues={{
          name: addressDetails?.name || '',
          streetNumber: addressDetails?.streetNumber || '',
          address: addressDetails?.address || '',
          postCode: addressDetails?.postCode || '',
          city: addressDetails?.city || '',
          codes: addressDetails?.codes || '',
          comments: addressDetails?.comments || '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({ handleSubmit, handleBlur, handleChange, values, setFieldValue }) => (
          <>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.container}>
                <TextInput
                  label="Nom"
                  value={values.name || ''}
                  handleChange={handleChange('name')}
                  handleBlur={handleBlur('name')}
                  clearField={() => setFieldValue('name', '')}
                />
                <TextInput
                  label="N°"
                  value={values.streetNumber?.toString() || ''}
                  handleChange={handleChange('streetNumber')}
                  handleBlur={handleBlur('streetNumber')}
                  isKeyBoardNumeric
                  clearField={() => setFieldValue('streetNumber', '')}
                />
                <TextInput
                  label="Adresse"
                  value={values.address || ''}
                  handleChange={handleChange('address')}
                  handleBlur={handleBlur('address')}
                  clearField={() => setFieldValue('address', '')}
                />
                <TextInput
                  label="Code postal"
                  value={values.postCode || ''}
                  handleChange={handleChange('postCode')}
                  handleBlur={handleBlur('postCode')}
                  clearField={() => setFieldValue('postCode', '')}
                />
                <TextInput
                  label="Ville"
                  value={values.city || ''}
                  handleChange={handleChange('city')}
                  handleBlur={handleBlur('city')}
                  clearField={() => setFieldValue('city', '')}
                />
                <TextInput
                  label="Codes"
                  value={values.codes || ''}
                  handleChange={handleChange('codes')}
                  handleBlur={handleBlur('codes')}
                  clearField={() => setFieldValue('codes', '')}
                />
                <TextInput
                  label="Commentaire"
                  value={values.comments || ''}
                  handleChange={handleChange('comments')}
                  handleBlur={handleBlur('comments')}
                  clearField={() => setFieldValue('comments', '')}
                />
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit} title={id ? 'Modifier' : 'Ajouter'} />
            </View>
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#1e1e59',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    maxHeight: 80,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  headerLeftIcon: {
    marginRight: 20,
  },
  textInput: {
    fontSize: 20,
    borderRadius: 4,
  },
  textInputContainer: {
    gap: 5,
  },
  scrollContainer: {
    backgroundColor: '#00002b',
    flex: 1,
  },
});
