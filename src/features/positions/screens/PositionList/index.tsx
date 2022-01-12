import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { View } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Select from "react-select";

import routes from "../../../../constants/routes";
import colors from "../../../../constants/colors";
import { TimeEntry, User, WorkSpaces } from "../../../../models";
import { Auth, DataStore } from "aws-amplify";

const date = new Date();
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const PositionList = () => {
  const [list, setList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("chocolate");
  const navigation: any = useNavigation();

  const timeEntryStart = async () => {
    const user = await Auth.currentUserInfo();
    await DataStore.save(
      new TimeEntry({
        billable: true,
        description: "Work",
        userId: user.username,
        workspaceId: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        timeInterval: {
          duration: "",
          end: date.toISOString(),
          start: date.toISOString(),
        },
      })
    );
  };
  const timeEntryLog = async () => {
    console.log(await DataStore.query(TimeEntry));
  };

  const dbList = async () => {
    const db = await DataStore.query(TimeEntry);
    setList(db);
  };
  if (list.length === 0) {
    dbList();
  }

  return (
    <SafeAreaView>
      <View style={styles.wrapperJobList}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.button} onPress={timeEntryStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={timeEntryLog}>
            <Text style={styles.buttonText}>Log</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setList([]);
              dbList();
            }}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <Select
          value={selectedOption}
          //onChange={() => setSelectedOption(selectedOption)}
          options={options}
        />
        {list.map((d) => (
          <View>
            <Text>{d.id}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const leftandright = Dimensions.get("screen").width * 0.06;

const styles = StyleSheet.create({
  buttonText: {
    color: colors.textColors.white,
    fontFamily: "SourceSansPro-regular",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primaryColors.syan,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    borderRadius: 4,
    shadowColor: colors.primaryColors.primary200,
    shadowOpacity: 0.3,
  },
  wrapperJobList: {
    margin: leftandright,
    padding: 5,
    height: hp("85%"),
  },
});

export default PositionList;
