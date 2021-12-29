import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User, OnBoardingForm } from "models";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Auth from "@aws-amplify/auth";

const ToDo = () => {
  const test = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const form = await DataStore.query(OnBoardingForm);
    const userData = await DataStore.query(
      User,
      authUser.attributes["custom:formID"]
    );
    for (let i = 0; i < form.length; i++) {
      for (let j = 0; j < userData.formChecked.length; j++) {
        if (form[i].title === userData.formChecked[j]) {
          console.log(userData.formChecked[j]);
        }
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.text}>
        <Text>ToDo Screen</Text>
        <View>
          <TouchableOpacity
            onPress={test}
            style={{ padding: 10, backgroundColor: "#eef", width: 50 }}
          >
            <Text>Log</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const leftandright = Dimensions.get("screen").width * 0.06;

const styles = StyleSheet.create({
  text: {
    margin: leftandright,
  },
  input: {
    margin: 5,
    padding: 2,
    borderWidth: 2,
    borderColor: "#00adef",
  },
});

export default ToDo;
