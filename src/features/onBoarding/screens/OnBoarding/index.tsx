import React, { useState } from "react";
import {
  StyleSheet,
  SectionList,
  View,
  Text,
  ScrollView,
  Button,
} from "react-native";
import _isEmpty from "lodash/isEmpty";
import { DataStore } from "@aws-amplify/datastore";
import { Form, UserDatabase } from "models";
import "react-native-get-random-values";

import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "native-base";
import Auth from "@aws-amplify/auth";

const OnBoarding = () => {
  const [data, updateList] = useState([]);
  const [groupValue, setGroupValue] = React.useState([]);

  const OnBoardingSubList = async () => {
    updateList(await DataStore.query(Form));
  };

  const OnBoardingSubUser = async () => {
    const currentPoolUser = await Auth.currentUserPoolUser();

    const user = await DataStore.query(UserDatabase);
    const findedUser = await user.find(
      (user) => user.email === currentPoolUser.attributes.email
    );

    const qqq = [];
    for (let i = 0; i < findedUser.formChecked.length; i++)
      qqq.push(findedUser.formChecked[i]);
    setGroupValue(qqq);
  };

  const saveFormChecked = async () => {
    const userData = await DataStore.query(UserDatabase);
    const currentPoolUser = await Auth.currentUserPoolUser();

    const currentUser = userData.find(
      (user) => user.email === currentPoolUser.attributes.email
    );

    await DataStore.save(
      Form.copyOf(currentUser, (updated) => {
        updated.formChecked = groupValue;
      })
    );
  };

  if (data.length === 0) OnBoardingSubList();

  if (groupValue.length === 0) OnBoardingSubUser();

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Checkbox.Group
        colorScheme="#00adef"
        defaultValue={groupValue}
        onChange={(values) => {
          setGroupValue(values || []);
        }}
      >
        <Checkbox style={styles.Checkbox} value={title}>
          {title}
        </Checkbox>
      </Checkbox.Group>
    </View>
  );

  return (
    <SafeAreaView style={{ marginTop: -50 }}>
      <Button
        title="Save"
        onPress={() => {
          saveFormChecked(groupValue);
        }}
      />
      <SectionList
        sections={data}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => item + index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Checkbox: {
    marginLeft: 5,
    marginRight: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "100",
  },
  item: {
    flexDirection: "row",
    marginVertical: 8,
    width: 300,
    margin: 10,
  },
  /*item: {
    width: 400,
    fontWeight: '200',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    height: 32,
  },*/
  sectionHeader: {
    padding: 15,
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
});

export default OnBoarding;
