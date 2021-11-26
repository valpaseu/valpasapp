import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Auth, nav } from "aws-amplify";
import * as Sentry from "sentry-expo";

import { AlertPopup } from "common/components/Alert";
import colors from "constants/colors";
import sizes from "constants/size";
import routes from "constants/routes";
import { enableGettingStartedScreen } from "features/gettingStarted/services";

const ProfileSetting = () => {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      Sentry.Native.captureException(error);
      AlertPopup({
        title: "Something went wrong",
        message: error?.message,
        buttons: [{ text: "Ok" }],
      });
    }
  };

  const handleLogOut = async () => {
    await signOut();
    await enableGettingStartedScreen();
    navigation.navigate(routes.gettingStarted.screen);
  };

  const settings = [
    {
      label: "Schedule",
      icon: <MaterialIcons name="schedule" style={styles.icon} />,
    },
    {
      label: "Earnings",
      icon: <MaterialIcons name="attach-money" style={styles.icon} />,
    },
    {
      label: "Notifications",
      icon: <Ionicons name="ios-notifications" style={styles.icon} />,
    },
    {
      label: "Messages",
      icon: <MaterialIcons name="message" style={styles.icon} />,
    },
    {
      label: "Edit profile",
      icon: <AntDesign name="profile" style={styles.icon} />,
    },
    {
      label: "Add OnBoarding",
      icon: <AntDesign name="profile" style={styles.icon}/>,
      handlePress: () => {navigation.navigate("onBoardingAdd")}
    },
    {
      label: "Log out",
      icon: <FontAwesome name="sign-out" style={styles.icon} />,
      handlePress: handleLogOut,
    },
  ];

  return (
    <View style={styles.container}>
      {settings.map(({ label, icon, handlePress = () => {} }, index) => (
        <View
          key={`profileSetting-${index}`}
          style={[styles.itemContainer, index === 0 && styles.firstItem]}
        >
          <TouchableOpacity style={styles.itemContent} onPress={handlePress}>
            <View style={styles.left}>
              <View style={styles.iconContainer}>{icon}</View>
              <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.right}>
              <Ionicons name="ios-arrow-forward" style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: colors.primaryColors.white,
    borderRadius: 15,
    marginBottom: "10%",
    alignItems: "center",
  },
  itemContainer: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    borderTopWidth: 2,
    borderTopColor: colors.primaryColors.primary400,
    alignItems: "center",
  },
  firstItem: {
    borderTopWidth: 0,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    width: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    backgroundColor: colors.primaryColors.primary400,
    borderRadius: 5,
    padding: 6,
  },
  icon: {
    color: colors.primaryColors.primary300,
    fontSize: 22,
  },
  label: {
    color: colors.primaryColors.primary300,
    fontSize: sizes.profile.settingLabel,
    fontWeight: "600",
    letterSpacing: 1.2,
    paddingLeft: 10,
  },
  arrow: {
    paddingRight: "20%",
    color: colors.primaryColors.primary300,
    fontWeight: "800",
    fontSize: 22,
  },
});

export default ProfileSetting;
