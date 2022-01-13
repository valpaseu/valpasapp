import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button } from "native-base";
import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TimePicker } from "@material-ui/pickers";

import colors from "constants/colors";
import routes from "constants/routes";

const leftandright = Dimensions.get("screen").width * 0.03;

const PositionDetail: FC<object> = () => {
  const navigation = useNavigation();
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <View style={styles.positionDetailContainer}>
      <ScrollView style={styles.positionDetailContainer}>
        <TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>Start</Text>
              <Text>End</Text>
            </View>
            <View>
              <Text>Thu, 13 Jan</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text><TimePicker
          clearable
          ampm={false}
          label="24 hours"
          value={selectedDate}
          onChange={handleDateChange}
        /></Text>
        <View>
          <Text>Description</Text>
        </View>
        <View>
          <Text>Billable</Text>
        </View>
      </ScrollView>
      <LinearGradient colors={["#ffffff3b", "#ffffff6b", "#FFFFFF"]}>
        <View style={styles.applyButtonContainer}>
          <Button
            style={styles.applyButton}
            onPress={() =>
              navigation.navigate(routes.mainScreens.positions.applyNow.screen)
            }
          >
            <Text style={styles.applyText}>Start</Text>
          </Button>
        </View>
      </LinearGradient>
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  positionLogo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  positionTitle: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  subTitle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  subTitleText: {
    fontSize: 13,
    color: colors.primaryColors.primary200,
  },
  positionLocation: {
    flexDirection: "row",
    borderLeftColor: colors.primaryColors.primary300,
    borderLeftWidth: 1,
    paddingLeft: 5,
    marginLeft: 8,
  },
  tabsButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: "42.5%",
    justifyContent: "center",
    backgroundColor: colors.primaryColors.white,
    borderRadius: 0,
  },
  activeButton: {
    marginHorizontal: 2.5,
    width: "42.5%",
    justifyContent: "center",
    backgroundColor: colors.primaryColors.white,
    borderRadius: 0,
  },
  activeTextTabButton: {
    color: colors.primaryColors.primary100,
  },
  textTabButton: {
    color: colors.primaryColors.primary600,
  },
  content: {
    alignItems: "center",
  },
  contentText: {
    fontSize: 13,
    color: colors.primaryColors.primary200,
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
