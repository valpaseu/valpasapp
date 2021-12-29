import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import route from "../../../constants/routes";

import OnBoardingAdd from "features/profile/screens/onBoardingAdd";
import ProfileScreen from "features/profile/screens/Profile";
import editProfile from "features/profile/screens/EditProfile";
import BackButton from "../../../common/components/BackButton";
import colors from "../../../constants/colors";

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={route.mainScreens.profile.profile.screen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={route.mainScreens.profile.addOnBoarding.screen}
        component={OnBoardingAdd}
      />
      <Stack.Screen
        name={route.mainScreens.profile.editProfile.screen}
        component={editProfile}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
};

const width = Dimensions.get("screen").width * 0.05;

const styles = StyleSheet.create({
  header: {
    shadowColor: "transparent",
    elevation: 0,
    backgroundColor: colors.primaryColors.background,
  },
  navIconContainer: {
    marginHorizontal: width,
  },
});

export default ProfileStack;
