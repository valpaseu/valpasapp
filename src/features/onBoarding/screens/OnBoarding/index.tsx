import Auth from "@aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { OnBoardingForm, User } from "models";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import Accordion from "react-native-collapsible/Accordion";
import { Checkbox } from "native-base";
import AppLoading from "expo-app-loading";

const OnBoarding = () => {
  const [loading, setLoading] = useState(true);
  const [data, updateData] = useState([]);
  const [userr, setUserr] = useState([]);
  const [groupValue, setGroupValue] = React.useState([]);
  const [states, setStates] = useState([]);
  const [timer, setTimer] = useState(100);

  
  const saveButton = async (title) => {
    if (groupValue.find((g) => g.title === title) === undefined) {
      console.log("ss");
    } else if (groupValue.find((g) => g.title === title).value === true) {
      if (!userr.formChecked.includes(title)) {
        try {
          await DataStore.save(
            User.copyOf(userr, (updated) => {
              updated.formChecked.push(title);
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  setTimeout(async () => {
    const userAuth = await Auth.currentAuthenticatedUser();
    const userAll = await DataStore.query(User);
    const user = await DataStore.query(
      User,
      userAuth.attributes["custom:formID"]
    );
    const userFind = userAll.find((u) => u.username === userAuth.username);
    const updateFormId = async (id) => {
      try {
        await Auth.updateUserAttributes(userAuth, {
          "custom:formID": id,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (userFind === undefined) {
      if (user === undefined) {
        try {
          await DataStore.save(
            new User({
              username: userAuth.username,
              times: [],
              formChecked: [],
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (userFind.id !== userAuth.attributes["custom:formID"]) {
        updateFormId(userFind.id);
      }
    }
    setTimer(30000);
  }, timer);

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

  setTimeout(async () => {
    if (userr.length === 0) {
      const currentUser = await Auth.currentAuthenticatedUser();
      const userrr = await DataStore.query(
        User,
        currentUser.attributes["custom:formID"]
      );
      setUserr(userrr);
    }
  }, 500);

  setTimeout(() => setLoading(false), 500);

  const renderSectionTitle = () => {
    return <View></View>;
  };

  const renderHeader = (section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
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
          <Text style={styles.checkboxText}>Olen lukenut ja ymmärän</Text>
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
        </View>

        <View style={styles.save}>
          <TouchableOpacity onPress={() => saveButton(section.title)}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setStates(activeSections);
  };

  if (!loading) {
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
        </ScrollView>
      </View>
    );
  } else {
    return (
      <AppLoading />
    );
  }
};

const styles = StyleSheet.create({
  saveText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "SourceSansPro-regular",
  },
  save: {
    backgroundColor: "#00adef",
    padding: 10,
    margin: 15,
    borderRadius: 10,
    width: 100,
  },
  checkbox: {
    marginRight: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 16,
  },
  checkboxText: {
    marginTop: 1,
    fontSize: 15,
    fontFamily: "SourceSansPro-regular",
  },
  itemTitle: {
    fontSize: 17,
    marginVertical: 8,
    width: 300,
    margin: 15,
    fontFamily: "SourceSansPro-regular",
  },
  itemText: {
    fontSize: 13,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: "SourceSansPro-regular",
  },
  sectionHeaderText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "SourceSansPro-regular",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
  },
});

export default OnBoarding;
