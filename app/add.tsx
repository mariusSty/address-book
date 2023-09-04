import Button from "@components/Button";
import TextInput from "@components/TextInput";
import { Stack } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Add() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ajouter une adresse",
        }}
      />
      <Formik
        initialValues={{
          name: "",
          streetNumber: "",
          address: "",
          postCode: "",
          city: "",
          codes: [],
          comments: "",
        }}
        onSubmit={(values) => alert(values.name)}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <>
            <ScrollView style={styles.container}>
              <View>
                <TextInput
                  label="Nom"
                  value={values.name}
                  handleChange={handleChange("name")}
                  handleBlur={handleBlur("name")}
                />
                <TextInput
                  label="N°"
                  value={values.streetNumber}
                  handleChange={handleChange("streetNumber")}
                  handleBlur={handleBlur("streetNumber")}
                  isKeyBoardNumeric
                />
                <TextInput
                  label="Adresse"
                  value={values.address}
                  handleChange={handleChange("address")}
                  handleBlur={handleBlur("address")}
                />
                <TextInput
                  label="Code postal"
                  value={values.postCode}
                  handleChange={handleChange("postCode")}
                  handleBlur={handleBlur("postCode")}
                />
                <TextInput
                  label="Ville"
                  value={values.city}
                  handleChange={handleChange("city")}
                  handleBlur={handleBlur("city")}
                />
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit} title="Ajouter" />
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
