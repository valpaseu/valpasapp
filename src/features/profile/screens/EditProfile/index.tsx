import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { UserDatabase } from "models";
import {
  Button,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { Formik } from "formik";
import Auth from "@aws-amplify/auth";

const editProfile = () => {
  const initialValues = {
    email: "",
    name: "",
    address: "",
    bio: "",
    location: "",
  };

  const userDate = async (values) => {
    const userDates = await DataStore.query(UserDatabase);
    const userPool = await Auth.currentUserInfo();
    const user = userDates.find(
      (users) => users.email === userPool.attributes.email
    );

    await DataStore.save(
      UserDatabase.copyOf(user, (updated) => {
        (updated.name = values.name),
          (updated.address = values.address),
          (updated.bio = values.bio),
          (updated.location = values.location);
      })
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => userDate(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.input}
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
              />
              <Text style={styles.text}>Bio</Text>
              <TextInput
                style={styles.input}
                value={values.bio}
                onChangeText={handleChange("bio")}
                onBlur={handleBlur("bio")}
              />
              <Text style={styles.text}>Location</Text>
              <TextInput
                style={styles.input}
                value={values.location}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
        <Button
          title="test"
          onPress={() => {
            console.log(initialValues);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 16,
  },
  input: {
    margin: 5,
    padding: 2,
    borderWidth: 2,
    borderColor: "#00adef",
  },
});

export default editProfile;
