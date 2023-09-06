import Button from "@components/Button";
import TextInput from "@components/TextInput";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "types";

const db = SQLite.openDatabase("address-book");

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
  const [addressDetails, setAddressDetails] = useState<AddressProps | null>(
    null
  );

  useEffect(() => {
    if (id) {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * from addresses WHERE id = ?",
          [id],
          (_, { rows: { _array } }) => setAddressDetails(_array[0])
        )
      );
    }
  }, []);

  const handleSubmit = (values: AddressProps) => {
    if (id) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE addresses SET name = ?, streetNumber = ?, address = ?, postCode = ?, city = ?, codes = ?, comments = ? WHERE id = ?",
          [
            values.name,
            values.streetNumber,
            values.address,
            values.postCode,
            values.city,
            values.codes || null,
            values.comments || null,
            id,
          ],
          () => {
            router.push({
              pathname: "/",
              params: { actionPerformed: Actions.Update },
            });
          }
        );
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO addresses (name, streetNumber, address, postCode, city, codes, comments) values (?, ?, ?, ?, ?, ?, ?)",
          [
            values.name,
            values.streetNumber,
            values.address,
            values.postCode,
            values.city,
            values.codes || null,
            values.comments || null,
          ],
          () => {
            router.push({
              pathname: "/",
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
          title: !!id ? "Modifier cette adresse" : "Ajouter une adresse",
        }}
      />
      <Formik
        initialValues={
          addressDetails ?? {
            name: "",
            streetNumber: "",
            address: "",
            postCode: "",
            city: "",
            codes: "",
            comments: "",
          }
        }
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <>
            <ScrollView style={styles.container}>
              <View>
                <TextInput
                  label="Nom"
                  value={values.name || ""}
                  handleChange={handleChange("name")}
                  handleBlur={handleBlur("name")}
                />
                <TextInput
                  label="N°"
                  value={values.streetNumber.toString() || ""}
                  handleChange={handleChange("streetNumber")}
                  handleBlur={handleBlur("streetNumber")}
                  isKeyBoardNumeric
                />
                <TextInput
                  label="Adresse"
                  value={values.address || ""}
                  handleChange={handleChange("address")}
                  handleBlur={handleBlur("address")}
                />
                <TextInput
                  label="Code postal"
                  value={values.postCode || ""}
                  handleChange={handleChange("postCode")}
                  handleBlur={handleBlur("postCode")}
                />
                <TextInput
                  label="Ville"
                  value={values.city || ""}
                  handleChange={handleChange("city")}
                  handleBlur={handleBlur("city")}
                />
                <TextInput
                  label="Codes"
                  value={values.codes || ""}
                  handleChange={handleChange("codes")}
                  handleBlur={handleBlur("codes")}
                />
                <TextInput
                  label="Commentaire"
                  value={values.comments || ""}
                  handleChange={handleChange("comments")}
                  handleBlur={handleBlur("comments")}
                />
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleSubmit}
                title={!!id ? "Modifier" : "Ajouter"}
              />
            </View>
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    fontSize: 20,
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 80,
    paddingVertical: 10,
  },
});
