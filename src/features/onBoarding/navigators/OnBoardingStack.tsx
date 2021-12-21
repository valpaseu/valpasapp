import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import colors from "constants/colors";
import OnBoardingScreen from "features/onBoarding/screens/OnBoarding";
import OnBoardingDetailScreen from "features/onBoarding/screens/OnBoardingDetail";

const OnBoardingStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Screen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={OnBoardingDetailScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  navIconContainer: {
    marginLeft: Dimensions.get("screen").width * 0.05,
  },
  header: {
    shadowColor: "transparent",
    elevation: 0,
    backgroundColor: colors.primaryColors.white,
  },
});

export default OnBoardingStack;
