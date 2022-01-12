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
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 18, fontFamily: "SourceSansPro-semiBold"}}>OnBoarding</Text>
        </View>
        <View style={{padding: 15, backgroundColor: "#808080", borderRadius: 5, shadowOpacity: 0.34, flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={{color: "#fff", fontFamily: "SourceSansPro-regular"}}>Toimintatavat yrityksessä</Text>
          <Text style={{color: "#fff", fontFamily: "SourceSansPro-regular"}}>Jan 2022</Text>
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
