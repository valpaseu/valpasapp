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
import { TimeEntry } from "../../../../models";

const leftandright = Dimensions.get("screen").width * 0.06;

const PositionDetail: FC<object> = (val) => {
  const navigation = useNavigation();
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
    )
    setDateEnd(ddd)
    setbillable(false);
    setCorrrect(true);
  };

  return (
    <View style={styles.positionDetailContainer}>
      <Formik
        initialValues={{
          description: "",
        }}
        onSubmit={async (values) => {
          if (correct) {
            try {
              const loginedUser = await Auth.currentUserInfo();
              await DataStore.save(
                new TimeEntry({
                  billable: billable,
                  description: values.description,
                  userId: loginedUser.username,
                  workspaceId: val.route.params.value,
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
            
          }
        }}
      >
        {({ handleChange, handleSubmit, handleBlur, values }) => (
          <>
            <ScrollView>
              <View style={{ alignContent: "center" }}>
                <Text
                  style={{ fontSize: 18, fontFamily: "SourceSansPro-semiBold" }}
                >
                  Time Adding
                </Text>
              </View>
              <View>
                <View>
                  <Text>Start</Text>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker1"
                      value={dateStart}
                      mode="datetime"
                      locale="fi-FI"
                      display="default"
                      onChange={onChangeStart}
                    />
                  )}
                </View>
                <View>
                  <Text>End</Text>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker2"
                      value={dateEnd}
                      mode="datetime"
                      locale="fi-FI"
                      display="default"
                      onChange={onChangeEnd}
                    />
                  )}
                </View>
                <View>
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
              <View>
                <Text>Description</Text>
                <TextInput
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text>Billable</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={billable ? "#f5dd4b" : "#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={billable}
                />
              </View>
            </ScrollView>
            <LinearGradient colors={["#ffffff3b", "#ffffff6b", "#FFFFFF"]}>
              <View style={styles.applyButtonContainer}>
                <Button style={styles.applyButton} onPress={handleSubmit}>
                  {correct ? (
                    <Text style={styles.applyText}>Add</Text>
                  ) : (
                    <Text style={styles.applyText}>Start</Text>
                  )}
                </Button>
              </View>
            </LinearGradient>
          </>
        )}
      </Formik>
    </View>
  );
};

export default PositionDetail;

const styles = StyleSheet.create({
  positionDetailContainer: {
    marginLeft: leftandright,
    marginRight: leftandright,
    flex: 1,
    backgroundColor: colors.primaryColors.background,
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
