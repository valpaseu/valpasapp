import React, { useState } from "react";
import {
  StyleSheet,
  SectionList,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import _isEmpty from "lodash/isEmpty";
import { DataStore } from "@aws-amplify/datastore";
import { OnBoardingForm, UserDatabase, FormInsideText } from "models";
import "react-native-get-random-values";

import routes from "constants/routes";

import { Checkbox } from "native-base";
import Auth from "@aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();
  const [data, updateList] = useState([]);
  const [buttons, setButtons] = useState([]);

  const testData = async () => {
    const models = await DataStore.query(OnBoardingForm);
    console.log(models);
  };

  if (data.length === 0) {
    const test = async () => {
      const models = await DataStore.query(OnBoardingForm);
      updateList(models);
    };
    test();
  }

  const userDate = async (title) => {
    const users = await DataStore.query(UserDatabase);
    const currentUser = await Auth.currentUserInfo();
    const user = users.find((e) => e.email === currentUser.attributes.email);
  };
  const settingButtons = async (button) => {
    const users = await DataStore.query(UserDatabase);
    const currentUser = await Auth.currentUserInfo();
    const user = users.find((e) => e.email === currentUser.attributes.email);
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={{ fontSize: 16 }}>{title.name}</Text>
      <Text style={{ fontSize: 12, marginTop: 6 }}>{title.text}</Text>
    </View>
  );

  return (
    <View>
      <SectionList
        sections={data}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity onPress={() => console.log(section.title)}>
                <Text style={styles.sectionHeader}>{section.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionHeader} onPress={() => {}}>
                <Text style={{ fontSize: 12, padding: 1 }}>Mark</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    width: 300,
    margin: 15,
  },
  sectionHeader: {
    padding: 15,
    fontSize: 14,
    fontWeight: "400",
  },
});

export default OnBoarding;
