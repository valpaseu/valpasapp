import React, { useState, useRef } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";

const PositionList = () => {
  const [list, setList] = useState([]);
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [stopCheckList, setStopCheckList] = useState(false);
  const [stopCheckItems, setStopCheckItems] = useState(false);

  const timeEntryLog = async () => {
    const test = await DataStore.query(WorkSpaces);
    console.log(test);
  };

  const dbList = async () => {
    const db = await DataStore.query(TimeEntry);
    if (db.length !== 0) setList(db);
    else setStopCheckList(true);
  };
  if (list.length === 0 && !stopCheckList) {
    dbList();
  }
  const dbItem = async () => {
    const work = await DataStore.query(WorkSpaces);
    if (work.length !== 0) {
      const q = [];
      for (let i = 0; i < work.length; i++) {
        q.push({ label: work[i].name, value: work[i].id });
      }
      setItems(q);
    } else setStopCheckItems(true);
  };
  if (items.length === 0 && !stopCheckItems) {
    dbItem();
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
              dbItem();
            }}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          disableBorderRadius={true}
          setValue={setValue}
          setItems={setItems}
        />
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
              <Text
                onPress={() => {
                  console.log(
                    new Date(
                      Date.parse(data?.timeInterval?.end) -
                        Date.parse(data?.timeInterval?.start)
                    )
                  );
                }}
              >
                Substant: {""}
                {new Date(
                  new Date(data?.timeInterval?.end) -
                    new Date(data?.timeInterval?.start)
                ).toLocaleTimeString("es-ES", {
                  timeZone: "Africa/Casablanca",
                })}
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
