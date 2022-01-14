import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { View } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import routes from "../../../../constants/routes";
import colors from "../../../../constants/colors";
import { TimeEntry, User, WorkSpaces } from "../../../../models";
import { Auth, DataStore } from "aws-amplify";

const PositionList = () => {
  const [list, setList] = useState([]);
  const navigation: any = useNavigation();

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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                routes.mainScreens.positions.positionAdd.screen
              )
            }
          >
            <Text style={styles.buttonText}>Add</Text>
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

        {list.map((data) => (
          <View style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ marginBottom: 10, marginTop: 5, marginLeft: 4 }}>
              {new Date(data.timeInterval.start).toDateString()}
            </Text>
            <View
              style={{
                backgroundColor: colors.primaryColors.white,
                padding: 15,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                shadowColor: colors.primaryColors.primary700,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {data.billable == true ? (
                  <Text>Paid</Text>
                ) : (
                  <Text>UnPaid</Text>
                )}
                <Icon
                  as={FontAwesome}
                  name="angle-double-down"
                  size="5"
                  onPress={async () => {
                    try {
                      await DataStore.delete(TimeEntry, data.id);
                      setList([]);
                      dbList();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              </View>
              {data.description != "" ? (
                <Text>{data.description}</Text>
              ) : (
                <Text>Without description</Text>
              )}
              <Text>
                Start:{" "}
                {new Date(data.timeInterval.start).toLocaleTimeString("fi-FI")}
              </Text>
              <Text>
                End:{" "}
                {new Date(data.timeInterval.end).toLocaleTimeString("fi-FI")}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const leftandright = Dimensions.get("screen").width * 0.02;

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
