import React, { useState } from "react";
import { StyleSheet, SectionList, View, Text, ScrollView } from "react-native";
import _isEmpty from "lodash/isEmpty";
import { DataStore } from "@aws-amplify/datastore";
import { Form, UserDatabase } from "models";
import "react-native-get-random-values";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const [data, updateList] = useState([]);

  const navigation = useNavigation();

  const FormTextList = async () => {
    updateList(await DataStore.query(Form));
  };

  if (data.length === 0) {
    FormTextList();
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}> - </Text>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
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
  itemText: {
    fontSize: 18,
    fontWeight: "100",
  },
  item: {
    flexDirection: "row",
    marginVertical: 8,
    width: 300,
    margin: 20,
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
