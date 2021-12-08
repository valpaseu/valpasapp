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
import { Form, UserDatabase, FormInsideText } from "models";
import "react-native-get-random-values";

import routes from "constants/routes";

import { Checkbox } from "native-base";
import Auth from "@aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation();

  const [dataText, setDataText] = useState([]);
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
    for (let i = 0; i <= findedUser.formChecked.length; i++)
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

  const takeFormInsideText = async () => {
    const models = await DataStore.query(FormInsideText);
    setDataText(models);
  };

  if (data.length === 0) OnBoardingSubList();

  if (groupValue.length === 0) OnBoardingSubUser();

  if (dataText.length === 0) takeFormInsideText();

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text>Title</Text>
      <Text>Lisää texti</Text>
    </View>
  );

  return (
    <ScrollView>
      <SectionList
        sections={data}
        renderItem={({ item }) => (<Text>{() => console.log(item)
        }</Text>)}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => item + index}
      />
      <Button
        title="Save"
        onPress={() => {
          saveFormChecked(groupValue);
        }}
      />
    </ScrollView>
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
