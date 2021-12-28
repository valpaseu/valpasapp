import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { UserDatabase } from "models";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { Formik } from "formik";
import Auth from "@aws-amplify/auth";

const ToDo = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>ToDo Screen</Text>
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

export default ToDo;
