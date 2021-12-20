import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { OnBoardingForm, UserDatabase } from "models";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Button,
  ScrollView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import Accordion from "react-native-collapsible/Accordion";
import { Checkbox } from "native-base";

const OnBoarding = () => {
  const [loading, setLoading] = useState(true);
  const [data, updateData] = useState([]);
  const [user, setUser] = useState([]);
  const [groupValue, setGroupValue] = React.useState([]);
  const [states, setStates] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  if (data.length === 0) {
    const dataSet = async () => {
      try {
        const models = await DataStore.query(OnBoardingForm);
        updateData(models);
      } catch (error) {
        console.log(error);
      }
    };
    dataSet();
  }
  if (user.length === 0) {
    const userSet = async () => {
      const users = await DataStore.query(UserDatabase);
      const currentUser = await Auth.currentUserInfo();
      const userq = users.find((e) => e.email === currentUser.attributes.email);
      setUser(userq);
    };
    userSet();
  }

  setTimeout(() => setLoading(false), 1000);

  const renderSectionTitle = () => {
    return <View></View>;
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
        <TouchableOpacity
          onPress={async () => {
            if (
              groupValue.find((g) => g.title === section.title) === undefined
            ) {
              console.log("ss");
            } else if (
              groupValue.find((g) => g.title === section.title).value === true
            ) {
              const users = await DataStore.query(UserDatabase);
              const currentUser = await Auth.currentUserInfo();
              const userq = users.find(
                (e) => e.email === currentUser.attributes.email
              );
              if (!userq.formChecked.includes(section.title)) {
                try {
                  await DataStore.save(
                    UserDatabase.copyOf(user, (updated) => {
                      updated.formChecked.push(section.title);
                    })
                  );
                } catch (error) {
                  console.log(error);
                }
              }
            }
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View>
        {section.data.map((param) => {
          return (
            <View>
              <Text style={styles.itemTitle}>{param.name}</Text>
              <Text style={styles.itemText}>{param.text}</Text>
            </View>
          );
        })}
        <View style={styles.checkbox}>
          <Checkbox
            value={section.title}
            accessibilityLabel={section.title}
            onChange={(val) => {
              if (val) {
                groupValue.push({ value: val, title: section.title });
              } else {
                for (let i = 0; i < groupValue.length; i++) {
                  if (groupValue[i].title === section.title)
                    groupValue.splice(i, 1);
                }
                setGroupValue(groupValue);
              }
            }}
          />
          <Text style={styles.checkboxText}>Accept</Text>
        </View>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setStates(activeSections);
  };

  if (true) {
    return (
      <View>
        <ScrollView style={{ alignSelf: "stretch" }}>
          <Accordion
            activeSections={states}
            sections={data}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          />
          <Button
            title="dd"
            onPress={async () => {
              const models = await DataStore.query(UserDatabase);
              console.log(models);
            }}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    marginLeft: 15,
  },
  checkboxText: {
    marginTop: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  itemTitle: {
    marginVertical: 8,
    width: 300,
    margin: 15,
  },
  itemText: {
    fontSize: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionHeaderText: {
    fontSize: 16,
    color: "#000",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
  },
});

export default OnBoarding;
