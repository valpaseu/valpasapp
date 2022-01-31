import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button } from "native-base";
import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import colors from "../../../../constants/colors";
import routes from "../../../../constants/routes";
import { Formik } from "formik";
import { Auth, DataStore } from "aws-amplify";
import { TimeEntry, UserCredentials } from "../../../../models";
import { SafeAreaView } from "react-native-safe-area-context";

const leftandright = Dimensions.get("screen").width * 0.06;

const PositionDetail: FC<object> = (val) => {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [show, setShow] = useState(Platform.OS === "ios");
  const [billable, setbillable] = useState(true);
  const [correct, setCorrrect] = useState(false);
  const toggleSwitch = () => setbillable((previousState) => !previousState);
  const [spinnerTime, setSpinnerTime] = useState(new Date(dateEnd - dateStart));

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || dateStart;
    setShow(Platform.OS === "ios");
    setDateStart(currentDate);
    setCorrrect(true);
    setbillable(false);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShow(Platform.OS === "ios");
    setDateEnd(currentDate);
    setCorrrect(true);
    setbillable(false);
  };
  const onChangeSpinner = (event, selectedTime) => {
    const currentDate = selectedTime || spinnerTime;
    setShow(Platform.OS === "ios");
    setSpinnerTime(currentDate);
    const ddd = new Date(
      dateStart.getFullYear(),
      dateStart.getMonth(),
      dateStart.getDate(),
      currentDate.getHours() + dateStart.getHours() - 2,
      currentDate.getMinutes() + dateStart.getMinutes(),
      "0"
    );
    setDateEnd(ddd);
    setbillable(false);
    setCorrrect(true);
  };

  const submit = async () => {
    if (correct) {
      try {
        const loginedUser = await Auth.currentUserInfo();
        await DataStore.save(
          new TimeEntry({
            billable: billable,
            description: description,
            userId: loginedUser.username,
            workspaceId: val.route.params.value,
            isActive: !correct,
            timeInterval: {
              duration: "",
              end: dateEnd.toISOString(),
              start: dateStart.toISOString(),
            },
          })
        );
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const loginedUser = await Auth.currentUserInfo();
        const original = await DataStore.query(UserCredentials);

        const create = await DataStore.save(
          new TimeEntry({
            billable: billable,
            description: description,
            userId: loginedUser.username,
            workspaceId: val.route.params.value,
            isActive: !correct,
            timeInterval: {
              duration: "",
              end: dateEnd.toISOString(),
              start: dateStart.toISOString(),
            },
          })
        );

        await DataStore.save(
          UserCredentials.copyOf(original[0], (updated) => {
            updated.activeTimeEntry = create.id;
          })
        );
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.default}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "SourceSansPro-semiBold",
          }}
        >
          Time Adding
        </Text>
      </View>
      <View>
        <View style={styles.default}>
          <View style={styles.time}>
            <Text style={styles.textmain}>Start</Text>
            {show && (
              <DateTimePicker
                style={{ width: 180 }}
                testID="dateTimePicker1"
                value={dateStart}
                mode="datetime"
                locale="fi-FI"
                display="default"
                onChange={onChangeStart}
              />
            )}
          </View>
          <View style={styles.time}>
            <Text style={styles.textmain}>End</Text>
            {show && (
              <DateTimePicker
                style={{ width: 180 }}
                testID="dateTimePicker2"
                value={dateEnd}
                mode="datetime"
                locale="fi-FI"
                display="default"
                onChange={onChangeEnd}
              />
            )}
          </View>
        </View>
        <View style={styles.default}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker3"
              value={spinnerTime}
              timeZoneOffsetInMinutes={0}
              mode="time"
              locale="fi-FI"
              display="spinner"
              onChange={onChangeSpinner}
            />
          )}
        </View>
      </View>
      <View style={styles.default}>
        <View>
          <Text style={styles.textmain}>Description</Text>
          <TextInput
            onChangeText={(newText) => setDescription(newText)}
            placeholder="Description"
            defaultValue={description}
          />
        </View>
      </View>
      <View style={styles.default}>
        <View style={styles.billable}>
          <Text style={styles.textmain}>Billable</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={billable ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={billable}
          />
        </View>
      </View>
      <View style={styles.applyButtonContainer}>
        <Button style={styles.applyButton} onPress={submit}>
          {correct ? (
            <Text style={styles.applyText}>Add</Text>
          ) : (
            <Text style={styles.applyText}>Start</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PositionDetail;

const styles = StyleSheet.create({
  textmain: {
    fontFamily: "SourceSansPro-regular",
    fontSize: 15,
  },
  default: {
    paddingLeft: leftandright,
    paddingRight: leftandright,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.primaryColors.primary600,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2.5,
    paddingBottom: 2.5,
  },
  billable: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  applyButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  applyButton: {
    width: "95%",
    height: 60,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: colors.primaryColors.blue,
  },
  applyText: {
    color: colors.primaryColors.white,
  },
});
